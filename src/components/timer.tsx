import { FunctionComponent } from 'react'
import { ProgressRing } from '../ui'
import { getFormatedTime } from '../utils'

interface TimerProps {
  msLeft: number
  timeFraction: number
  isRunning: boolean
}

export const Timer: FunctionComponent<TimerProps> = ({ msLeft, timeFraction, isRunning }) => {
  // const circle = useRef(null)
  // useLayoutEffect(() => console.log(circle.current.length), [])

  const getActionText = () => {
    if (!msLeft) {
      return 'restart'
    }
    if (isRunning) {
      return 'pause'
    } else {
      return 'start'
    }
  }

  return (
    <div className='flex p-16 w-[300px] h-[300px] bg-gradient-to-tl from-slate-700 to-slate-900 rounded-full shadow'>
      <div className='relative w-full h-full rounded-full bg-slate-900'>
        <div className='absolute inset-[10px]'></div>
        <ProgressRing stroke={5} progressFraction={timeFraction}></ProgressRing>
        <div className=''>
          <div>{getFormatedTime(msLeft)}</div>
          {/* <div className='uppercase'>{getActionText()}</div> */}
        </div>
      </div>
    </div>
  )
}
