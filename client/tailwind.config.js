const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.(js,ts,jsx,tsx)",
    "./src/components/**/*.(js,ts,jsx,tsx)"
  ],
  theme: {
    extend: {
      backgroundColor: {
        'brand': '#202029',
        'black-25': 'rgba(0, 0, 0, 0.25)',
      },
      colors: {
        primary: '#FF7652',
        purple: '#6C5ECF',
        'light-blue': '#32A8E2',
        gray: {
          400: '#9898ad',
          500: '#6B6B7B',
          600: '#5B5B6B',
          800: '#353340',
          900: '#272532',
        },
        placeholder: '#5c5a69',
      },
      gridTemplateColumns: {
        '25': 'repeat(auto-fill, 25%)',
        '33': 'repeat(auto-fill, 33.33%)',
        '50': 'repeat(auto-fill, 50%)',
        '100': 'repeat(auto-fill, 100%)',
      },
      flex: {
        '25': '1 1 calc((100% / 4) - 2rem)',
        '33': '1 1 calc((100% / 3) - 2rem)',
        '50': '1 1 calc((100% / 2) - 2rem)',
        '100': '1 1 100%',
      },
      boxShadow: {
        DEFAULT: '0 3px 12px rgba(0, 0, 0, 0,03)',
        md: '0 3px 12px rgba(0, 0, 0, 0.1)'
      },
      keyFrames: {
        fade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        scaleIn: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.9)',
          },
          '50%': {
            opacity: 0.3,
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)',
          },
        }
      },
      fontSize: {
        xs: '0.9rem',
        sm: '1rem',
        tiny: '1.2rem',
        base: '1.4rem',
        lg: '1.5rem',
        xl: '1.6rem',
        '2xl': '1.75rem',
        '3xl': '1.9rem',
      },
      animation: {
        fade: 'fade 0.5s ease-in-out',
        scaleIn: 'scaleIn 0.35s ease-in-out',
      }
    }
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.shadow-block': {
          display: 'block',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          animation: 'scaleIn 0.35s ease-in-out',
          backgroundColor: '#272532'
        }
      })
    })
  ]
}

