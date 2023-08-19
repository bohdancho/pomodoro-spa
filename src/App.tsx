import { useEffect, useState } from 'react'
import { Mode, Presets } from 'types'
import './App.tw.css'
import { Settings } from './components'
import { useTimer } from './hooks'
import { MINUTE_IN_MS, getFormatedTime } from './utils'

// const defaultTheme: Theme = { color: 'tomato', font: 'kumbh-sans' }
const defaultPresets: Presets = {
  pomodoro: MINUTE_IN_MS * 25,
  'short-break': MINUTE_IN_MS * 3,
  'long-break': MINUTE_IN_MS * 5,
}

function App() {
  // const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [activeMode, setActiveMode] = useState<Mode>('pomodoro')
  const [presets, setPresets] = useState(defaultPresets)

  const { msLeft, setTotalMs: setTotalMs, resetTimer, triggerAction } = useTimer(presets[activeMode])
  useEffect(() => setTotalMs(presets[activeMode]), [presets, activeMode, setTotalMs])

  const handleModeChange = (mode: Mode) => {
    if (mode === activeMode) {
      resetTimer()
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
      <div onClick={triggerAction}>{getFormatedTime(msLeft)}</div>
      <Settings presets={presets} setPresets={setPresets}></Settings>
    </div>
  )
}

export default App
