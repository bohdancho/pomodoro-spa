import { Dispatch, FunctionComponent, MouseEventHandler, SetStateAction, useReducer, useState } from 'react'

import { ReactComponent as GearImg } from '@/assets/gear.svg'
import { Mode, Presets, Theme } from '@/models'
import { getKeys } from '@/utils'

import { AutosaveSettings } from './components/autosaveSettings'
import { PresetsSettings } from './components/presetsSettings'
import { ThemeSettings } from './components/themeSettings'

interface SettingsProps {
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme>>
  presets: Presets
  setPresets: Dispatch<SetStateAction<Presets>>
  saveMsLeft: boolean
  setSaveMsLeft: Dispatch<SetStateAction<boolean>>
}

export const Settings: FunctionComponent<SettingsProps> = ({
  theme,
  setTheme,
  presets,
  setPresets,
  saveMsLeft,
  setSaveMsLeft,
}) => {
  const [isVisible, toggleIsVisible] = useReducer((prev) => !prev, false)
  const [updatedTheme, setUpdatedTheme] = useState(theme)
  const [updatedPresets, setUpdatedPresets] = useState(presets)
  const [invalidPresets, setInvalidPresets] = useState<Mode[]>([])

  const save = () => {
    const _invalidPresets: Mode[] = []
    getKeys(updatedPresets).forEach((mode) => {
      if (updatedPresets[mode] === undefined) {
        _invalidPresets.push(mode)
      }
    })
    if (_invalidPresets.length) {
      setInvalidPresets(_invalidPresets)
      return
    }

    setPresets(updatedPresets)
    setTheme(updatedTheme)
    toggleIsVisible()
  }

  const overlayClickHandler: MouseEventHandler = (e) => {
    if (e.target === e.currentTarget) {
      toggleIsVisible()
    }
  }

  return (
    <>
      <button type='button' onClick={toggleIsVisible}>
        <GearImg></GearImg>
      </button>
      <div
        onClick={overlayClickHandler}
        className={`${
          isVisible ? '' : 'pointer-events-none opacity-0'
        } fixed inset-0 z-50 flex items-center px-[24px] backdrop-brightness-50 transition-opacity duration-200 md:px-[40px]`}
      >
        <form className='relative mx-auto w-full max-w-[400px] rounded-[15px] bg-white text-slate-900 md:max-w-[540px]'>
          <h2 className='border-b border-neutral-200 px-[24px] pb-[28px] pt-[24px] text-xl md:px-[40px] md:pb-[31px] md:pt-[34px] md:text-[28px]'>
            Settings
          </h2>
          <div className='px-[24px] md:px-[40px]'>
            <PresetsSettings
              presets={updatedPresets}
              setPresets={setUpdatedPresets}
              invalidPresets={invalidPresets}
            ></PresetsSettings>
            <ThemeSettings theme={updatedTheme} setTheme={setUpdatedTheme}></ThemeSettings>
            <AutosaveSettings saveMsLeft={saveMsLeft} setSaveMsLeft={setSaveMsLeft}></AutosaveSettings>
          </div>
          <button
            type='button'
            className='mx-auto block w-[140px] translate-y-1/2 rounded-[26.50px] bg-primary pb-[17px] pt-[14px] text-center text-base text-white hover:brightness-110'
            onClick={save}
          >
            Apply
          </button>
          <button
            type='button'
            onClick={toggleIsVisible}
            className='absolute right-[24px] top-[29px] h-[16px] w-[16px] text-[19px] leading-[16px] text-slate-400 md:right-[38px] md:top-[43px]'
          >
            ✖
          </button>
        </form>
      </div>
    </>
  )
}
