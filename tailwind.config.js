/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        md: '1024px',
        lg: '1440px',
      },
      colors: {
        primary: 'var(--color-primary)',
        grey: '#D7E0FF',
        'light-grey': '#EFF1FA',
        'dark-blue': '#1E213F',
        'very-dark-blue': '#161932',
        white: '#FFFFFF',
      },
      fontSize: {
        h1: ['100px', { lineHeight: '120px', letterSpacing: '-5px', fontWeight: 700 }],
        h2: ['28px', { lineHeight: '34px', fontWeight: 700 }],
        h3: ['16px', { lineHeight: '19px', letterSpacing: '15px', fontWeight: 700 }],
        h4: ['13px', { lineHeight: '16px', letterSpacing: '5px', fontWeight: 700 }],
        base: ['14px', { lineHeight: '18px', fontWeight: 700 }],
        'base-sm': ['12px', { lineHeight: '14px', fontWeight: 700 }],
      },
      spacing: {
        8: '8px',
        16: '16px',
        20: '20px',
        24: '24px',
        32: '32px',
        40: '40px',
        48: '48px',
      },
      borderRadius: {
        input: '10px',
        button: '26px',
      },
      boxShadow: {
        DEFAULT: '50px 50px 100px 0px #121530, -50px -50px 100px 0px #272C5A',
      },
    },
  },
  plugins: [],
}
