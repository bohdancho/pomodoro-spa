import { Dispatch, FunctionComponent, SetStateAction } from 'react'
import { ReactComponent as KumbhSansIcon } from '../../assets/kumbh-sans-icon.svg'
import { ReactComponent as RobotoSlabIcon } from '../../assets/roboto-slab-icon.svg'
import { ReactComponent as SpaceMonoIcon } from '../../assets/space-mono-icon.svg'
import { ReactComponent as CheckmarkIcon } from '../../assets/checkmark.svg'
import { Color, Font, Theme } from '../../models'

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
      <div className='py-24 border-b border-neutral-200'>
        <h3 className='text-center uppercase text-[12px] tracking-[4px] mb-16'>font</h3>
        <div className='flex justify-center gap-16'>
          {Object.values(Font).map((font) => (
            <label
              key={font}
              className={`${
                font === theme.font ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800/75 cursor-pointer'
              } flex items-center justify-center w-40 h-40 rounded-full transition-[background-color,color] duration-300`}
            >
              {getFontIcon(font)}
              <input
                className='absolute invisible'
                type='radio'
                onChange={() => setTheme({ ...theme, font })}
                checked={font === theme.font}
              />
            </label>
          ))}
        </div>
      </div>
      <div className='py-24'>
        <h3 className='text-center uppercase text-[12px] tracking-[4px] mb-16'>color</h3>
        <div className='flex justify-center gap-16'>
          {Object.values(Color).map((color) => (
            <label
              key={color}
              style={{ backgroundColor: color }}
              className={`${
                color === theme.color ? '' : 'cursor-pointer'
              } flex items-center justify-center w-40 h-40 rounded-full transition-[background-color,color] duration-300`}
            >
              <span className={`${color === theme.color ? 'opacity-1' : 'opacity-0'} transition-opacity duration-200`}>
                <CheckmarkIcon></CheckmarkIcon>
              </span>
              <input
                className='absolute invisible'
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
