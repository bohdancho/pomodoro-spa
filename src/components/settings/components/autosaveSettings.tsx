import { Dispatch, FunctionComponent, SetStateAction } from 'react'

import { ReactComponent as CheckmarkIcon } from '@/assets/checkmark.svg'
import { SettingsSubtitle } from './settingsSubtitle'

interface AutosaveSettingsProps {
  saveMsLeft: boolean
  setSaveMsLeft: Dispatch<SetStateAction<boolean>>
}

export const AutosaveSettings: FunctionComponent<AutosaveSettingsProps> = ({ saveMsLeft, setSaveMsLeft }) => {
  return (
    <div className='items-center pt-[24px] md:flex md:justify-between'>
      <SettingsSubtitle className='mb-[16px] md:mb-0'>save time left on reload</SettingsSubtitle>
      <div className='flex justify-center gap-[16px]'>
        <label
          className={`${
            saveMsLeft ? 'bg-green-400' : 'bg-red-400'
          } pointer relative flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full transition-[background-color,color] duration-300`}
        >
          <div className='absolute -inset-[5px] rounded-full border-[2px] border-slate-100 opacity-0 hover:opacity-100'></div>
          <span className={`${!saveMsLeft ? 'opacity-0' : ''} transition-opacity duration-200`}>
            <CheckmarkIcon></CheckmarkIcon>
          </span>
          <input
            className='invisible absolute'
            type='checkbox'
            onChange={() => setSaveMsLeft(!saveMsLeft)}
            checked={saveMsLeft}
          />
        </label>
      </div>
    </div>
  )
}
