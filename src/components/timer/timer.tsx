import { FunctionComponent } from 'react'

import { useBreakpoints } from '@/hooks'
import { getFormatedTime } from '@/utils'

import { ProgressRing } from './progressRing'

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
    <div className='relative flex aspect-square w-[300px] cursor-pointer rounded-full bg-gradient-to-tl from-slate-700 to-slate-900 p-[16px] shadow md:w-[380px] md:p-[22px]'>
      <div className='flex h-full w-full items-center justify-center rounded-full bg-slate-900'>
        <div className='absolute inset-[26px] md:inset-[35px]'>
          <ProgressRing stroke={isMd ? 11 : 8} progressFraction={timeFraction}></ProgressRing>
        </div>
        <div className='mb-[16px] select-none text-[70px] md:text-[85px]'>{getFormatedTime(msLeft)}</div>
        <div className='absolute bottom-[86px] select-none text-[13px] uppercase tracking-[10px] md:bottom-[110px] md:text-base'>
          {getActionText()}
        </div>
      </div>
    </div>
  )
}
