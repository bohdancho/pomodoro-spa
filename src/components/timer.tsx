import { FunctionComponent } from 'react'
import { ProgressRing } from '../ui'
import { getFormatedTime } from '../utils'

interface TimerProps {
  msLeft: number
  timeFraction: number
  isRunning: boolean
}

export const Timer: FunctionComponent<TimerProps> = ({ msLeft, timeFraction, isRunning }) => {
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
    <div className='cursor-pointer flex p-16 w-[300px] h-[300px] bg-gradient-to-tl from-slate-700 to-slate-900 rounded-full shadow'>
      <div className='relative flex items-center justify-center w-full h-full rounded-full bg-slate-900'>
        <div className='absolute inset-[10px]'>
          <ProgressRing stroke={8} progressFraction={timeFraction}></ProgressRing>
        </div>
        <div className='mb-16 text-[70px] pointer-events-none'>{getFormatedTime(msLeft)}</div>
        <div className='absolute uppercase bottom-[70px] text-[13px] tracking-[10px] pointer-events-none'>
          {getActionText()}
        </div>
      </div>
    </div>
  )
}
