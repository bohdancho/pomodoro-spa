import { ChangeEvent, Dispatch, FunctionComponent, SetStateAction, useState } from 'react'
import { Mode, Presets } from '../types'
import { MINUTE_IN_MS, getKeys, getMinutes, isPositiveInteger } from '../utils'

interface PresetsSettingsProps {
  presets: Presets
  setPresets: Dispatch<SetStateAction<Presets>>
}

export const PresetsSettings: FunctionComponent<PresetsSettingsProps> = ({ presets, setPresets }) => {
  const [updatedPresets, setUpdatedPresets] = useState(presets)

  const handleChange = (e: ChangeEvent<HTMLInputElement>, mode: Mode) => {
    const value = e.target.value
    if (isPositiveInteger(value)) {
      setUpdatedPresets({ ...presets, [mode]: Number(value) * MINUTE_IN_MS })
    }
  }

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setPresets(updatedPresets)
  }

  return (
    <form>
      {getKeys(presets).map((mode) => (
        <div className='mb-16' key={mode}>
          <div>{mode}</div>
          <input
            type='text'
            className='text-black'
            value={getMinutes(updatedPresets[mode])}
            onChange={(e) => handleChange(e, mode)}
          />
        </div>
      ))}
      <button onClick={handleSaveClick}>apply</button>
    </form>
  )
}
