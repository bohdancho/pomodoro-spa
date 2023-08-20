import { useLayoutEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'
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
  const [theme, setTheme] = useLocalStorage<Theme>('theme', defaultTheme)
  const [activeMode, setActiveMode] = useLocalStorage<Mode>('activeMode', 'pomodoro')
  const [presets, setPresets] = useLocalStorage('presets', defaultPresets)

  const { msLeft, isRunning, totalMs, setTotalMs, resetTimer, triggerAction } = useTimer(presets[activeMode])

  const handleModeChange = (mode: Mode) => {
    if (mode === activeMode) {
      resetTimer()
      return
    }
    setActiveMode(mode)
  }

  useLayoutEffect(() => setTotalMs(presets[activeMode]), [presets, activeMode, setTotalMs])

  return (
    <main
      style={{ '--color-primary': theme.color, fontFamily: theme.font } as CustomCSS}
      className='flex flex-col items-center justify-center w-screen h-screen gap-[48px] pt-[5vh] pb-[7vh] text-blue-100 bg-slate-800 md:pt-[4vh] md:pb-[5vh] md:gap-0 lg:py-[4vh] lg:gap-0 lg:justify-between'
    >
      <h1 className='text-[32px] md:mb-[5vh] lg:mb-0'>pomodoro</h1>
      <div className='w-full md:mb-[6vh] lg:mb-0'>
        <ModeTabs presets={presets} activeMode={activeMode} handleModeChange={handleModeChange}></ModeTabs>
      </div>
      <div onClick={triggerAction} className=''>
        {
          <Timer
            msLeft={msLeft}
            isRunning={isRunning}
            timeFraction={1 - Math.round((msLeft / totalMs) * 1000) / 1000}
          ></Timer>
        }
      </div>
      <div className='mt-auto lg:mt-0'>
        <Settings theme={theme} setTheme={setTheme} presets={presets} setPresets={setPresets}></Settings>
      </div>
    </main>
  )
}

export default App
