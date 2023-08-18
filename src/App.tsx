import { useEffect, useState } from 'react'
import { Mode, Presets } from 'types'
import './App.tw.css'

// const defaultTheme: Theme = { color: 'tomato', font: 'kumbh-sans' }
const defaultPresets: Presets = { pomodoro: 15000, 'short-break': 3000, 'long-break': 5000 }

function App() {
  // const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [activeMode, setActiveMode] = useState<Mode>('pomodoro')
  const [presets] = useState(defaultPresets)
  const [isRunning, setIsRunning] = useState(false)
  const [msLeft, setMsLeft] = useState<number>(defaultPresets[activeMode])

  const resetTimer = () => {
    setIsRunning(false)
    setMsLeft(presets[activeMode])
  }

  useEffect(resetTimer, [presets, activeMode])

  useEffect(() => {
    if (!isRunning) {
      return
    }

    const intervalId = setInterval(() => setMsLeft((ms) => ms - 10), 10)
    return () => clearInterval(intervalId)
  }, [isRunning])

  useEffect(() => {
    if (!msLeft) {
      setIsRunning(false)
    }
  }, [msLeft])

  const onTimerClick = () => {
    if (msLeft) {
      setIsRunning(!isRunning)
      return
    }
    resetTimer()
  }

  const handleModeChange = (mode: Mode) => {
    if (mode === activeMode) {
      resetTimer()
      return
    }
    setActiveMode(mode)
  }

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen gap-24 text-white text-h2 bg-slate-800'>
      <h1>pomodoro</h1>
      <div className='flex gap-16'>
        <button className='p-4 border border-gray border-1' onClick={() => handleModeChange('pomodoro')}>
          pomodoro
        </button>
        <button className='p-4 border border-gray border-1' onClick={() => handleModeChange('short-break')}>
          short break
        </button>
        <button className='p-4 border border-gray border-1' onClick={() => handleModeChange('long-break')}>
          long break
        </button>
      </div>
      <div onClick={onTimerClick}>{msLeft}</div>
      <div>settings</div>
    </div>
  )
}

export default App
