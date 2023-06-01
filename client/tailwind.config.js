const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,scss}"
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        'sidebar-lg': '1024px',
      },
      backgroundColor: {
        'brand': '#202029',
        'black-25': 'rgba(0, 0, 0, 0.25)',
        'black-50': 'rgba(0, 0, 0, 0.50)',
        'fg-item': '#252836',
        'like-red': '#FF5555',
        '0': 'rgba(0, 0, 0, 0)',
      },
      colors: {
        primary: '#FF7652',
        purple: '#6C5ECF',
        focus: '#fff',
        'light-blue': '#32A8E2',
        'success-green': '#4E712D',
        'warning': '#eaa84c',
        gray: {
          300: '#B3a9BE',
          400: '#9898ad',
          500: '#6B6B7B',
          600: '#5B5B6B',
          800: '#353340',
          900: '#272532',
        },
        placeholder: '#5c5a69',
      },
      gridTemplateColumns: {
        '80-33': '80% 33%',
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
        xxs: '0.8rem',
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
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.shadow-block': {
          display: 'block',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          animation: 'scaleIn 0.35s ease-in-out',
          backgroundColor: '#272532'
        },
        '.focus-style': {
          boxShadow: '0 0 0 0.25rem theme(\'colors.focus\')',
          outline: 'none',
          transition: 'box-shadow 0.2s ease-in-out',
        },
        '.a-overlay': {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          zIndex: '10',
          boxShadow: 'none',
        },
      })
    })
  ]
}

