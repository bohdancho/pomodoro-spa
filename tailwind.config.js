import plugin from 'tailwindcss/plugin'

const textShadowPlugin = plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      'text-shadow': (value) => ({
        textShadow: value,
      }),
    },
    { values: theme('textShadow') },
  )
})

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        md: '640px', // also change useBreakpoints.ts
        lg: '1024px',
      },
      colors: {
        primary: 'var(--color-primary)',
      },
      boxShadow: {
        DEFAULT: '50px 50px 100px 0px #121530, -50px -50px 100px 0px #272C5A',
      },
      textShadow: {
        DEFAULT: '0 0 0 var(--tw-shadow-color)',
      },
    },
  },
  plugins: [textShadowPlugin],
}
