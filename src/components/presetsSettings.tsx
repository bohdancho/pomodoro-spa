import { ChangeEvent, Dispatch, FunctionComponent, SetStateAction } from 'react'
import { Mode, Presets } from '../models'
import { MINUTE_IN_MS, getKeys, getMinutes, isPositiveInteger } from '../utils'

interface PresetsSettingsProps {
  presets: Presets
  setPresets: Dispatch<SetStateAction<Presets>>
}

export const PresetsSettings: FunctionComponent<PresetsSettingsProps> = ({ presets, setPresets }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, mode: Mode) => {
    const value = e.target.value
    if (isPositiveInteger(value)) {
      setPresets({ ...presets, [mode]: Number(value) * MINUTE_IN_MS })
    }
  }

  return (
    <form>
      {getKeys(presets).map((mode) => (
        <div className='mb-16' key={mode}>
          <div>{mode}</div>
          <input
            type='text'
            className='text-black'
            value={getMinutes(presets[mode])}
            onChange={(e) => handleChange(e, mode)}
          />
        </div>
      ))}
    </form>
  )
}
