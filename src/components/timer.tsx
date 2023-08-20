import { FunctionComponent } from 'react'
import { useBreakpoints } from '../hooks'
import { ProgressRing } from '../ui'
import { getFormatedTime } from '../utils'

interface TimerProps {
  msLeft: number
  timeFraction: number
  isRunning: boolean
}

export const Timer: FunctionComponent<TimerProps> = ({ msLeft, timeFraction, isRunning }) => {
  const { isMd } = useBreakpoints()

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
    <div className='relative cursor-pointer flex p-[16px] w-[300px] aspect-square bg-gradient-to-tl from-slate-700 to-slate-900 rounded-full shadow md:w-[410px] md:p-[22px]'>
      <div className='flex items-center justify-center w-full h-full rounded-full bg-slate-900'>
        <div className='absolute inset-[26px] md:inset-[35px]'>
          <ProgressRing stroke={isMd ? 11 : 8} progressFraction={timeFraction}></ProgressRing>
        </div>
        <div className='mb-[16px] text-[70px] select-none md:text-[85px]'>{getFormatedTime(msLeft)}</div>
        <div className='absolute uppercase bottom-[86px] text-[13px] tracking-[10px] select-none md:text-base md:bottom-[110px]'>
          {getActionText()}
        </div>
      </div>
    </div>
  )
}
