import { useState, useEffect } from 'react'

export function useTimer(initTotalTime: number) {
  const [isRunning, setIsRunning] = useState(false)
  const [msLeft, setMsLeft] = useState(initTotalTime)
  const [totalTime, setTotalTime] = useState(initTotalTime)

  const resetTimer = () => {
    setIsRunning(false)
    setMsLeft(totalTime)
  }

  const handleTime = () => {
    if (!isRunning) {
      return
    }

    const STEP_MS = 10
    const intervalId = setInterval(() => setMsLeft((ms) => ms - STEP_MS), STEP_MS)
    return () => clearInterval(intervalId)
  }

  const triggerAction = () => {
    if (msLeft) {
      setIsRunning(!isRunning)
      return
    }
    resetTimer()
  }

  useEffect(resetTimer, [totalTime])
  useEffect(handleTime, [isRunning])
  useEffect(() => {
    if (!msLeft) {
      setIsRunning(false)
    }
  }, [msLeft])

  return { msLeft, setTotalTime, resetTimer, triggerAction }
}
