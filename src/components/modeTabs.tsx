import { FunctionComponent, useLayoutEffect, useRef, useState } from 'react'
import { Mode, Presets } from '../models'
import { getKeys } from '../utils'

interface ModeTabsProps {
  presets: Presets
  activeMode: Mode
  handleModeChange: (mode: Mode) => void
}

export const ModeTabs: FunctionComponent<ModeTabsProps> = ({ presets, activeMode, handleModeChange }) => {
  const activeButtonRef = useRef<HTMLButtonElement | null>()
  const [activeLayerLeft, setActiveLayerLeft] = useState<number | null>(null)
  const [activeLayerRight, setActiveLayerRight] = useState<number | null>(null)

  useLayoutEffect(() => {
    document.fonts.ready.then(() => {
      const buttonRect = activeButtonRef.current?.getBoundingClientRect()
      const parentRect = activeButtonRef.current?.parentElement?.getBoundingClientRect()

      if (buttonRect && parentRect) {
        setActiveLayerLeft(buttonRect.left - parentRect.left)
        setActiveLayerRight(parentRect.right - buttonRect.right)
      }
    })
  }, [activeMode])

  const buttonPaddings = 'px-24 py-[18px]'

  const getButton = (mode: Mode) => (
    <button
      ref={(ref) => (activeMode === mode ? (activeButtonRef.current = ref) : null)}
      type='button'
      key={mode}
      className={buttonPaddings}
      onClick={() => handleModeChange(mode)}
    >
      <div className='relative z-10 text-blue-100'>{mode}</div>
    </button>
  )

  return (
    <div className='flex p-8 rounded-full bg-slate-900'>
      <div className='relative'>
        {getKeys(presets).map(getButton)}
        <div
          className='absolute top-0 z-20 flex pointer-events-none transition-[clip-path] duration-1000'
          style={{ clipPath: `inset(0 ${activeLayerRight}px 0 ${activeLayerLeft}px)` }}
        >
          {getKeys(presets).map((mode) => (
            <div key={mode} className={buttonPaddings}>
              <div className='relative text-slate-800 shadow-slate-800 text-shadow'>{mode}</div>
            </div>
          ))}
        </div>
        {activeLayerLeft !== null && activeLayerRight !== null ? (
          <div
            className='absolute h-full bg-primary top-0 rounded-full pointer-events-none duration-1000 transition-[left,right] transform'
            style={{ left: activeLayerLeft, right: activeLayerRight }}
          ></div>
        ) : null}
      </div>
    </div>
  )
}
