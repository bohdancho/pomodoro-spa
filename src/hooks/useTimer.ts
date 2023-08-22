import { useCallback, useEffect, useLayoutEffect, useReducer, useState } from 'react'

const DEV_SPEED_UP = import.meta.env.DEV ? 1000 : 1
const STEP_MS = 10

export function useTimer(initTotalMs: number) {
  const [totalMs, setTotalMs] = useState(initTotalMs)
  const [isRunning, setIsRunning] = useState(false)
  const [msLeft, dispatchMsLeft] = useReducer(msReducer, initTotalMs)

  useLayoutEffect(resetTimer, [totalMs])
  useEffect(handleTime, [isRunning])

  function resetTimer() {
    setIsRunning(false)
    dispatchMsLeft('reset')
  }

  function handleTime() {
    if (!isRunning) {
      return
    }

    const intervalId = setInterval(() => dispatchMsLeft('tick'), STEP_MS)
    return () => clearInterval(intervalId)
  }

  const triggerAction = useCallback(() => {
    if (msLeft) {
      setIsRunning((prev) => !prev)
      return
    }
    resetTimer()
  }, [msLeft])

  function msReducer(prevMsLeft: number, action: 'tick' | 'reset') {
    switch (action) {
      case 'reset': {
        return totalMs
      }
      case 'tick': {
        if (!isRunning) {
          return prevMsLeft
        }

        const newMsLeft = prevMsLeft - STEP_MS * DEV_SPEED_UP
        if (newMsLeft <= 0) {
          setIsRunning(false)
          return 0
        }
        return newMsLeft
      }
    }
  }

  return { msLeft, isRunning, totalMs, setTotalMs, resetTimer, triggerAction }
}
