import { FunctionComponent, useEffect, useRef, useState } from 'react'

interface ProgressBarProps {
  radius: number
  stroke: number
  progressFraction: number
}

export const ProgressRing: FunctionComponent<ProgressBarProps> = ({ radius, stroke, progressFraction }) => {
  const svgRef = useRef(null)
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI

  const [strokeDashoffset, setStrokeDashoffset] = useState(0)
  useEffect(() => {
    setStrokeDashoffset(circumference - progressFraction * circumference)
  }, [circumference, progressFraction])

  return (
    <svg height={radius * 2} width={radius * 2} className='-rotate-90' ref={svgRef}>
      <circle
        className='stroke-current fill-transparent text-primary'
        strokeLinecap='round'
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        strokeDashoffset={strokeDashoffset}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      ></circle>
    </svg>
  )
}
