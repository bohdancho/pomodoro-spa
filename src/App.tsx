import { useState } from 'react'
import './App.tw.css'
import { ModeTabs, Settings, Timer } from './components'
import { useTimer } from './hooks'
import { Color, CustomCSS, Font, Mode, Presets, Theme } from './models'
import { MINUTE_IN_MS } from './utils'

const defaultTheme: Theme = { color: Color.tomato, font: Font.spaceMono }
const defaultPresets: Presets = {
  pomodoro: MINUTE_IN_MS * 25,
  'short-break': MINUTE_IN_MS * 3,
  'long-break': MINUTE_IN_MS * 5,
}

function App() {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [activeMode, setActiveMode] = useState<Mode>('pomodoro')
  const [presets, setPresets] = useState(defaultPresets)

  const { msLeft, isRunning, setTotalMs, resetTimer, triggerAction } = useTimer(presets[activeMode])

  const handleModeChange = (mode: Mode) => {
    if (mode === activeMode) {
      resetTimer()
    }
    setActiveMode(mode)
    setTotalMs(presets[mode])
  }

  return (
    <div
      style={{ '--color-primary': theme.color, fontFamily: theme.font } as CustomCSS}
      className='flex flex-col items-center justify-center w-screen h-screen gap-[48px] pt-[32px] pb-[48px] text-blue-100 bg-slate-800'
    >
      <h1 className='text-[32px]'>pomodoro</h1>
      <ModeTabs presets={presets} activeMode={activeMode} handleModeChange={handleModeChange}></ModeTabs>
      <div onClick={triggerAction}>
        {
          <Timer
            msLeft={msLeft}
            isRunning={isRunning}
            timeFraction={1 - Math.round((msLeft / presets[activeMode]) * 1000) / 1000}
          ></Timer>
        }
      </div>
      <div className='mt-auto'>
        <Settings theme={theme} setTheme={setTheme} presets={presets} setPresets={setPresets}></Settings>
      </div>
    </div>
  )
}

export default App
