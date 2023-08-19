import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react'
import { PresetsSettings, ThemeSettings } from '.'
import { Presets, Theme } from '../models'

interface SettingsProps {
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme>>
  presets: Presets
  setPresets: Dispatch<SetStateAction<Presets>>
}

export const Settings: FunctionComponent<SettingsProps> = ({ theme, setTheme, presets, setPresets }) => {
  const [updatedTheme, setUpdatedTheme] = useState(theme)
  const [updatedPresets, setUpdatedPresets] = useState(presets)

  const save = () => {
    setTheme(updatedTheme)
    setPresets(updatedPresets)
  }

  return (
    <div>
      <PresetsSettings presets={updatedPresets} setPresets={setUpdatedPresets}></PresetsSettings>
      <ThemeSettings theme={updatedTheme} setTheme={setUpdatedTheme}></ThemeSettings>
      <button type='button' onClick={save}>
        apply
      </button>
    </div>
  )
}
