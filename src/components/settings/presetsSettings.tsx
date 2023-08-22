import { ChangeEvent, Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react'

import { Mode, Presets } from '@/models'
import { MINUTE_IN_MS, getKeys, getMinutes, isPositiveInteger } from '@/utils'

interface PresetsSettingsProps {
  presets: Presets
  setPresets: Dispatch<SetStateAction<Presets>>
  invalidPresets: Mode[]
}

export const PresetsSettings: FunctionComponent<PresetsSettingsProps> = ({ presets, setPresets, invalidPresets }) => {
  const [touchedPresets, setTouchedPresets] = useState<Mode[]>([])
  useEffect(() => {
    setTouchedPresets([])
  }, [invalidPresets])

  const handleChange = (e: ChangeEvent<HTMLInputElement>, mode: Mode) => {
    const value = e.target.value

    if (isPositiveInteger(value) || value === '') {
      setPresets({ ...presets, [mode]: value === '' ? undefined : Number(value) * MINUTE_IN_MS })
    }
  }

  const handleTouch = (mode: Mode) => setTouchedPresets([...touchedPresets, mode])

  return (
    <div className='border-b border-neutral-200 py-[24px]'>
      <h3 className='mb-[16px] text-center text-[12px] uppercase tracking-[4px] md:mb-[26px] md:text-left md:text-[13px]'>
        time (minutes)
      </h3>
      <div className='flex flex-col gap-[8px] md:flex-row md:gap-[20px]'>
        {getKeys(presets).map((mode) => (
          <label className='flex items-center justify-between md:flex-col md:items-start' key={mode}>
            <span className='text-sm text-slate-400 md:mb-[10px] md:text-xs'>{mode.replace('-', ' ')}</span>
            <input
              type='numbers'
              className={`${
                !touchedPresets.includes(mode) && invalidPresets.includes(mode)
                  ? 'border-red-500'
                  : 'border-transparent'
              } w-[140px] rounded-[10px] border-2 bg-slate-100 px-[16px] pb-[10px] pt-[12px] text-sm text-black md:pb-[14px] md:pt-[11px]`}
              value={presets[mode] === undefined ? '' : getMinutes(presets[mode])}
              onBlur={() => handleTouch(mode)}
              onChange={(e) => handleChange(e, mode)}
            ></input>
          </label>
        ))}
      </div>
    </div>
  )
}
