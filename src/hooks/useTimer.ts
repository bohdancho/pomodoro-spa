import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

const DEV_SPEED_UP = import.meta.env.DEV ? 1000 : 1

export function useTimer(initTotalMs: number) {
  const [isRunning, setIsRunning] = useState(false)
  const [msLeft, setMsLeft] = useState(initTotalMs)
  const [totalMs, setTotalMs] = useState(initTotalMs)

  if (!msLeft && isRunning) {
    setIsRunning(false)
  }

  const resetTimer = useCallback(() => {
    setIsRunning(false)
    setMsLeft(totalMs)
  }, [totalMs])

  useLayoutEffect(resetTimer, [totalMs, resetTimer])
  useEffect(handleTime, [isRunning])

  function handleTime() {
    if (!isRunning) {
      return
    }

    const STEP_MS = 10
    const intervalId = setInterval(() => setMsLeft((ms) => ms - STEP_MS * DEV_SPEED_UP), STEP_MS)
    return () => clearInterval(intervalId)
  }

  function triggerAction() {
    if (msLeft) {
      setIsRunning(!isRunning)
      return
    }
    resetTimer()
  }

  return { msLeft, isRunning, totalMs, setTotalMs, resetTimer, triggerAction }
}
