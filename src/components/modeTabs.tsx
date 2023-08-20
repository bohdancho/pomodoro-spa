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
  const [activeLayerPosition, setActiveLayerPosition] = useState<{ left: number; right: number } | null>(null)

  useLayoutEffect(() => {
    document.fonts.ready.then(() => {
      const buttonRect = activeButtonRef.current?.getBoundingClientRect()
      const parentRect = activeButtonRef.current?.parentElement?.getBoundingClientRect()

      if (buttonRect && parentRect) {
        const left = buttonRect.left - parentRect.left
        const right = parentRect.right - buttonRect.right
        setActiveLayerPosition({ left, right })
      }
    })
  }, [activeMode])

  const buttonStyles = 'text-[13px] px-[20px] py-[16px]'

  const getButton = (mode: Mode) => (
    <button
      ref={(ref) => (activeMode === mode ? (activeButtonRef.current = ref) : null)}
      type='button'
      key={mode}
      className={buttonStyles}
      onClick={() => handleModeChange(mode)}
    >
      <div className='text-blue-100'>{mode}</div>
    </button>
  )

  const getTextMask = ({ left, right }: { left: number; right: number }) => (
    <div
      className='absolute top-0 z-10 flex pointer-events-none transition-[clip-path] duration-1000'
      style={{ clipPath: `inset(0 ${right}px 0 ${left}px)` }}
    >
      {getKeys(presets).map((mode) => (
        <div key={mode} className={buttonStyles}>
          <div className='text-slate-800 shadow-slate-800 text-shadow'>{mode}</div>
        </div>
      ))}
    </div>
  )

  const getActiveLayer = ({ left, right }: { left: number; right: number }) => (
    <div
      className='absolute h-full bg-primary top-0 rounded-full pointer-events-none duration-1000 transition-[left,right] transform'
      style={{ left, right }}
    ></div>
  )

  return (
    <div className='flex p-8 rounded-full select-none bg-slate-900 whitespace-nowrap'>
      <div className='relative'>
        {getKeys(presets).map(getButton)}
        {activeLayerPosition ? (
          <>
            {getTextMask(activeLayerPosition)}
            {getActiveLayer(activeLayerPosition)}
          </>
        ) : null}
      </div>
    </div>
  )
}
