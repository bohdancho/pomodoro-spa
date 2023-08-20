import { Dispatch, FunctionComponent, MouseEventHandler, SetStateAction, useReducer, useState } from 'react'
import { PresetsSettings, ThemeSettings } from '.'
import { ReactComponent as GearImg } from '../../assets/gear.svg'
import { Presets, Theme } from '../../models'

interface SettingsProps {
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme>>
  presets: Presets
  setPresets: Dispatch<SetStateAction<Presets>>
}

export const Settings: FunctionComponent<SettingsProps> = ({ theme, setTheme, presets, setPresets }) => {
  const [isVisible, toggleIsVisible] = useReducer((prev) => !prev, false)
  const [updatedTheme, setUpdatedTheme] = useState(theme)
  const [updatedPresets, setUpdatedPresets] = useState(presets)

  const save = () => {
    setTheme(updatedTheme)
    setPresets(updatedPresets)
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
          isVisible ? '' : 'opacity-0 pointer-events-none'
        } fixed inset-0 z-50 flex items-center px-[24px] backdrop-brightness-50 transition-opacity duration-200`}
      >
        <form className='w-full rounded-[15px] bg-white text-slate-900'>
          <h2 className='pt-[24px] pl-[24px] text-xl border-b pb-[28px] border-neutral-200'>Settings</h2>
          <div className='px-[24px]'>
            <PresetsSettings presets={updatedPresets} setPresets={setUpdatedPresets}></PresetsSettings>
            <ThemeSettings theme={updatedTheme} setTheme={setUpdatedTheme}></ThemeSettings>
          </div>
          <button
            type='button'
            className='mx-auto translate-y-1/2 block w-[140px] text-center pt-[14px] pb-[17px] text-white text-base bg-red-400 rounded-[26.50px]'
            onClick={save}
          >
            Apply
          </button>
        </form>
      </div>
    </>
  )
}
