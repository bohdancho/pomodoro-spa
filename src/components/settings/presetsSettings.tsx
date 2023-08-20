import { ChangeEvent, Dispatch, FunctionComponent, SetStateAction } from 'react'
import { Mode, Presets } from '../../models'
import { MINUTE_IN_MS, getKeys, getMinutes, isPositiveInteger } from '../../utils'

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
    <form className='py-24 border-b border-neutral-200'>
      <h3 className='text-center uppercase text-[12px] tracking-[4px] mb-16'>time (minutes)</h3>
      <div className='flex flex-col gap-8'>
        {getKeys(presets).map((mode) => (
          <label className='flex items-center justify-between' key={mode}>
            <span className='text-sm text-slate-400'>{mode.replace('-', ' ')}</span>
            <input
              type='text'
              className='w-[140px] bg-slate-100 rounded-[10px] text-black px-16 pt-[12px] pb-[10px] text-[14px]'
              value={getMinutes(presets[mode])}
              onChange={(e) => handleChange(e, mode)}
            ></input>
          </label>
        ))}
      </div>
    </form>
  )
}
