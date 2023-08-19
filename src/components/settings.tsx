import { Dispatch, FunctionComponent, SetStateAction, useReducer, useState } from 'react'
import { PresetsSettings, ThemeSettings } from '.'
import { Presets, Theme } from '../models'

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
  }

  return (
    <>
      <button type='button' onClick={toggleIsVisible}>
        settings
      </button>
      {isVisible ? (
        <div>
          <PresetsSettings presets={updatedPresets} setPresets={setUpdatedPresets}></PresetsSettings>
          <ThemeSettings theme={updatedTheme} setTheme={setUpdatedTheme}></ThemeSettings>
          <button type='button' onClick={save}>
            apply
          </button>
        </div>
      ) : null}
    </>
  )
}
