import { useEffect, useLayoutEffect, useState } from 'react'

export function useTimer(initTotalMs: number) {
  const [isRunning, setIsRunning] = useState(false)
  const [msLeft, setMsLeft] = useState(initTotalMs)
  const [totalMs, setTotalMs] = useState(initTotalMs)

  const resetTimer = () => {
    setIsRunning(false)
    setMsLeft(totalMs)
  }

  const handleTime = () => {
    if (!isRunning) {
      return
    }

    const STEP_MS = 10
    const intervalId = setInterval(() => setMsLeft((ms) => ms - STEP_MS * 2000), STEP_MS)
    return () => clearInterval(intervalId)
  }

  const triggerAction = () => {
    if (msLeft) {
      setIsRunning(!isRunning)
      return
    }
    resetTimer()
  }

  useLayoutEffect(resetTimer, [totalMs])
  useEffect(handleTime, [isRunning])
  useEffect(() => {
    if (!msLeft) {
      setIsRunning(false)
    }
  }, [msLeft])

  return { msLeft, isRunning, totalMs, setTotalMs, resetTimer, triggerAction }
}
