import { FunctionComponent, useLayoutEffect, useRef, useState } from 'react'

interface ProgressBarProps {
  stroke: number
  progressFraction: number
}

interface ComputableParams {
  normalizedRadius: number
  circumference: number
  strokeDashoffset: number
}

export const ProgressRing: FunctionComponent<ProgressBarProps> = ({ stroke, progressFraction }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [radius, setRadius] = useState<number | null>(null)
  const [computableParams, setComputableParams] = useState<ComputableParams | null>(null)

  useLayoutEffect(() => {
    const wrapperElem = wrapperRef.current
    if (!wrapperElem) {
      return
    }

    const _radius = wrapperElem.clientHeight / 2
    setRadius(_radius)
    setComputableParams(getParams(_radius, stroke, progressFraction))
  }, [progressFraction, stroke, wrapperRef])

  return (
    <div className='w-full h-full' ref={wrapperRef}>
      {radius && computableParams ? (
        <svg className='w-full h-full -rotate-90'>
          <circle
            className='stroke-current fill-transparent text-primary'
            strokeLinecap='round'
            strokeWidth={stroke}
            strokeDasharray={computableParams.circumference + ' ' + computableParams.circumference}
            strokeDashoffset={computableParams.strokeDashoffset}
            r={computableParams.normalizedRadius}
            cx={radius}
            cy={radius}
          ></circle>
        </svg>
      ) : null}
    </div>
  )
}

function getParams(radius: number, stroke: number, progressFraction: number): ComputableParams {
  // const normalizedRadius = radius - stroke * 2
  const normalizedRadius = radius - stroke * 0.5
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - progressFraction * circumference

  return { normalizedRadius, circumference, strokeDashoffset }
}
