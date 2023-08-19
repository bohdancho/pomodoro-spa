import { Dispatch, FunctionComponent, SetStateAction } from 'react'
import { Color, Font, Theme } from '../../models'
import { getKeys } from '../../utils'

interface ThemeSettingsProps {
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme>>
}

export const ThemeSettings: FunctionComponent<ThemeSettingsProps> = ({ theme, setTheme }) => {
  return (
    <>
      <div>
        {getKeys(Font).map((font) => (
          <label key={font} className='block'>
            {font}
            <input
              type='radio'
              onChange={() => setTheme({ ...theme, font: Font[font] })}
              value={font}
              checked={Font[font] === theme.font}
            />
          </label>
        ))}
      </div>
      <div>
        {getKeys(Color).map((color) => (
          <label key={color} className='block'>
            {color}
            <input
              type='radio'
              onChange={() => setTheme({ ...theme, color: Color[color] })}
              value={color}
              checked={Color[color] === theme.color}
            />
          </label>
        ))}
      </div>
    </>
  )
}
