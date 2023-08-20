import { Dispatch, FunctionComponent, SetStateAction, useReducer, useState } from 'react'
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
  const [isVisible, toggleIsVisible] = useReducer((prev) => !prev, true)
  const [updatedTheme, setUpdatedTheme] = useState(theme)
  const [updatedPresets, setUpdatedPresets] = useState(presets)

  const save = () => {
    setTheme(updatedTheme)
    setPresets(updatedPresets)
  }

  return (
    <>
      <button type='button' onClick={toggleIsVisible}>
        <GearImg></GearImg>
      </button>
      {isVisible ? (
        <div className='fixed inset-0 z-50 flex items-center px-24 backdrop-brightness-50'>
          <form className='w-full rounded-[15px] bg-white text-slate-900'>
            <h2 className='pt-24 pl-24 text-xl border-b pb-28 border-neutral-200'>Settings</h2>
            <div className='px-24'>
              <PresetsSettings presets={updatedPresets} setPresets={setUpdatedPresets}></PresetsSettings>
              <ThemeSettings theme={updatedTheme} setTheme={setUpdatedTheme}></ThemeSettings>
            </div>
            <button type='button' onClick={save}>
              apply
            </button>
          </form>
        </div>
      ) : null}
    </>
  )
}
