import { FunctionComponent, useEffect, useRef, useState } from 'react'

import { Mode, Presets } from '@/models'
import { getKeys } from '@/utils'

interface ModeTabsProps {
  presets: Presets
  activeMode: Mode
  handleModeChange: (mode: Mode) => void
}

export const ModeTabs: FunctionComponent<ModeTabsProps> = ({ presets, activeMode, handleModeChange }) => {
  const activeButtonRef = useRef<HTMLButtonElement | null>()
  const [activeLayerPosition, setActiveLayerPosition] = useState<{ left: number; right: number } | null>(null)

  const handleActiveLayer = () => {
    const buttonRect = activeButtonRef.current?.getBoundingClientRect()
    const parentRect = activeButtonRef.current?.parentElement?.getBoundingClientRect()

    if (buttonRect && parentRect) {
      const left = buttonRect.left - parentRect.left
      const right = parentRect.right - buttonRect.right
      setActiveLayerPosition({ left, right })
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleActiveLayer)
    return () => {
      window.removeEventListener('resize', handleActiveLayer)
    }
  }, [])

  useEffect(() => {
    document.fonts.ready.then(handleActiveLayer)
  }, [activeMode])

  const buttonStyles = 'text-[13px] w-1/3 text-center py-[16px] md:text-sm md:py-[18px]'

  const getButton = (mode: Mode) => (
    <button
      ref={(ref) => (activeMode === mode ? (activeButtonRef.current = ref) : null)}
      type='button'
      key={mode}
      className={buttonStyles}
      onClick={() => handleModeChange(mode)}
    >
      <div className='text-blue-100/80'>{mode.replace('-', ' ')}</div>
    </button>
  )

  const getTextMask = ({ left, right }: { left: number; right: number }) => (
    <div
      className='pointer-events-none absolute inset-0 z-20 transition-[clip-path] duration-1000'
      style={{ clipPath: `inset(0 ${right}px 0 ${left}px)` }}
    >
      <div className='flex'>
        {getKeys(presets).map((mode) => (
          <div key={mode} className={buttonStyles}>
            <div className='text-slate-800 shadow-slate-800 text-shadow'>{mode.replace('-', ' ')}</div>
          </div>
        ))}
      </div>
    </div>
  )

  const getActiveLayer = ({ left, right }: { left: number; right: number }) => (
    <div
      className='pointer-events-none absolute top-0 z-10 h-full transform rounded-full bg-primary transition-[left,right] duration-1000'
      style={{ left, right }}
    ></div>
  )

  return (
    <div className='w-full px-[24px]'>
      <div className='mx-auto max-w-[373px] select-none whitespace-nowrap rounded-full bg-slate-900 px-[6px] py-[8px] md:max-w-[390px] md:px-[8px]'>
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
    </div>
  )
}
