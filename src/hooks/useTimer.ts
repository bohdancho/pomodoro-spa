import alarm from '@/assets/alarm-digital.mp3'
import { WorkerInterval } from '@/utils'
import { useCallback, useEffect, useLayoutEffect, useReducer, useState } from 'react'

const alarmAudio = new Audio(alarm)

const DEV_SPEED_UP = import.meta.env.DEV ? 1000 : 1
const STEP_MS = 10

export function useTimer(totalMs: number) {
  const [isRunning, setIsRunning] = useState(false)
  const [msLeft, dispatchMsLeft] = useReducer(msReducer, totalMs)

  const resetTimer = useCallback(() => {
    setIsRunning(false)
    dispatchMsLeft('reset')
  }, [])

  useLayoutEffect(resetTimer, [totalMs, resetTimer])
  useEffect(handleTime, [isRunning])

  function handleTime() {
    if (!isRunning) {
      return
    }

    const interval = new WorkerInterval(() => dispatchMsLeft('tick'), STEP_MS)
    return () => interval.stop()
  }

  const triggerAction = useCallback(() => {
    if (msLeft) {
      setIsRunning((prev) => !prev)
      return
    }
    resetTimer()
  }, [msLeft, resetTimer])

  function msReducer(prevMsLeft: number, action: 'tick' | 'reset') {
    switch (action) {
      case 'reset': {
        return totalMs
      }
      case 'tick': {
        if (!isRunning) {
          return prevMsLeft
        }

        const newMsLeft = Math.max(0, prevMsLeft - STEP_MS * DEV_SPEED_UP)
        if (newMsLeft === 0) {
          setIsRunning(false)
          alarmAudio.play()
        }
        return newMsLeft
      }
    }
  }

  return { msLeft, isRunning, resetTimer, triggerAction }
}
