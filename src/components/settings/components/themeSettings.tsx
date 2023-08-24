import { Dispatch, FunctionComponent, SetStateAction } from 'react'

import { ReactComponent as CheckmarkIcon } from '@/assets/checkmark.svg'
import { ReactComponent as KumbhSansIcon } from '@/assets/kumbh-sans-icon.svg'
import { ReactComponent as RobotoSlabIcon } from '@/assets/roboto-slab-icon.svg'
import { ReactComponent as SpaceMonoIcon } from '@/assets/space-mono-icon.svg'
import { Color, Font, Theme } from '@/models'

import { SettingsSubtitle } from './settingsSubtitle'

interface ThemeSettingsProps {
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme>>
}

const getFontIcon = (font: Font) => {
  switch (font) {
    case Font.kumbhSans:
      return <KumbhSansIcon></KumbhSansIcon>
    case Font.robotoSlab:
      return <RobotoSlabIcon></RobotoSlabIcon>
    case Font.spaceMono:
      return <SpaceMonoIcon></SpaceMonoIcon>
  }
}

export const ThemeSettings: FunctionComponent<ThemeSettingsProps> = ({ theme, setTheme }) => {
  return (
    <>
      <div className='items-center border-b border-neutral-200 py-[24px] md:flex md:justify-between'>
        <SettingsSubtitle className='mb-[16px] md:mb-0'>font</SettingsSubtitle>
        <div className='flex justify-center gap-[16px]'>
          {Object.values(Font).map((font) => (
            <label
              key={font}
              className={`${
                font === theme.font ? 'bg-slate-900 text-white' : 'cursor-pointer bg-slate-100 text-slate-800/75'
              } relative flex h-[40px] w-[40px] items-center justify-center rounded-full transition-[background-color,color] duration-300`}
            >
              {getFontIcon(font)}
              <div
                className={`${
                  font !== theme.font ? 'hover:opacity-100' : ''
                } absolute -inset-[5px] rounded-full border-[2px] border-slate-100 opacity-0`}
              ></div>
              <input
                className='invisible absolute'
                type='radio'
                onChange={() => setTheme({ ...theme, font })}
                checked={font === theme.font}
              />
            </label>
          ))}
        </div>
      </div>
      <div className='items-center pt-[24px] md:flex md:justify-between'>
        <SettingsSubtitle className='mb-[16px] md:mb-0'>color</SettingsSubtitle>
        <div className='flex justify-center gap-[16px]'>
          {Object.values(Color).map((color) => (
            <label
              key={color}
              style={{ backgroundColor: color }}
              className={`${
                color === theme.color ? '' : 'cursor-pointer'
              } relative flex h-[40px] w-[40px] items-center justify-center rounded-full transition-[background-color,color] duration-300`}
            >
              <div
                className={`${
                  color !== theme.color ? 'hover:opacity-100' : ''
                } absolute -inset-[5px] rounded-full border-[2px] border-slate-100 opacity-0`}
              ></div>
              <span className={`${color !== theme.color ? 'opacity-0' : ''} transition-opacity duration-200`}>
                <CheckmarkIcon></CheckmarkIcon>
              </span>
              <input
                className='invisible absolute'
                type='radio'
                onChange={() => setTheme({ ...theme, color })}
                checked={color === theme.color}
              />
            </label>
          ))}
        </div>
      </div>
    </>
  )
}
