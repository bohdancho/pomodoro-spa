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

    if (isPositiveInteger(value) || value === '') {
      setPresets({ ...presets, [mode]: value === '' ? undefined : Number(value) * MINUTE_IN_MS })
    }
  }

  return (
    <div className='py-[24px] border-b border-neutral-200'>
      <h3 className='text-center md:text-left uppercase text-[12px] md:text-[13px] tracking-[4px] mb-[16px] md:mb-[26px]'>
        time (minutes)
      </h3>
      <div className='flex flex-col gap-[8px] md:flex-row md:gap-[20px]'>
        {getKeys(presets).map((mode) => (
          <label className='flex items-center justify-between md:flex-col md:items-start' key={mode}>
            <span className='md:mb-[10px] text-sm md:text-xs text-slate-400'>{mode.replace('-', ' ')}</span>
            <input
              type='numbers'
              className='w-[140px] bg-slate-100 rounded-[10px] text-black px-[16px] pt-[12px] pb-[10px] md:pt-[11px] md:pb-[14px] text-sm'
              value={presets[mode] === undefined ? '' : getMinutes(presets[mode])}
              onChange={(e) => handleChange(e, mode)}
            ></input>
          </label>
        ))}
      </div>
    </div>
  )
}
