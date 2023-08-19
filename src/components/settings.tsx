import { ChangeEvent, Dispatch, FunctionComponent, SetStateAction } from 'react'
import { Mode, Presets } from '../types'
import { MINUTE_IN_MS, getMinutes, isPositiveInteger } from '../utils'
interface SettingsProps {
  presets: Presets
  setPresets: Dispatch<SetStateAction<Presets>>
}

const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>

export const Settings: FunctionComponent<SettingsProps> = ({ presets, setPresets }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>, mode: Mode) => {
    const value = e.target.value
    if (isPositiveInteger(value)) {
      setPresets({ ...presets, [mode]: Number(value) * MINUTE_IN_MS })
    }
  }

  return (
    <>
      <div>settings</div>
      <div>pomodoro</div>
      {getKeys(presets).map((mode) => (
        <div key={mode}>
          <input
            type='text'
            className='text-black'
            value={getMinutes(presets[mode])}
            onChange={(e) => onChange(e, mode)}
          />
          <div>{mode}</div>
        </div>
      ))}
    </>
  )
}
