/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blush': {
          primary: '#D8A7B1',
          dusty: '#C98F9B',
          soft: '#E8C4C8',
          pale: '#F3DDE0',
          cream: '#F8F1EA',
          ivory: '#FFF9F5',
          mauve: '#9B737C',
          deep: '#6F4A52',
          champagne: '#C9A07A',
        },
        'wedding': {
          50: '#FFF9F5',
          100: '#F8F1EA',
          200: '#F3DDE0',
          300: '#E8C4C8',
          400: '#D8A7B1',
          500: '#C98F9B',
          600: '#9B737C',
          700: '#6F4A52',
          800: '#5A3C43',
          900: '#3F2A2F',
        },
        'rose': {
          50: '#FFF9F5',
          100: '#F3DDE0',
          200: '#E8C4C8',
          300: '#D8A7B1',
          400: '#C98F9B',
          500: '#9B737C',
          600: '#6F4A52',
          700: '#5A3C43',
          800: '#3F2A2F',
          900: '#2A1C20',
        },
        'gold': {
          50: '#FFF9F5',
          100: '#F8F1EA',
          200: '#E8D5B8',
          300: '#D4B896',
          400: '#C9A07A',
          500: '#B8956C',
          600: '#9A7A55',
          700: '#7A6044',
          800: '#5C4834',
          900: '#3F3123',
        }
      },
      fontFamily: {
        'serif': ['Alice', 'serif'],
        'sans': ['Albert Sans', 'sans-serif'],
        'script': ['Lavishly Yours', 'cursive'],
        'poppins': ['Albert Sans', 'sans-serif'],
        'title': ['Caribbean', 'serif'],
        'albert': ['Albert Sans', 'sans-serif'],
        'caribbean': ['Caribbean', 'serif'],
        'lavishly': ['Lavishly Yours', 'cursive'],
        'leckerli': ['Leckerli One', 'cursive'],
        'alice': ['Alice', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
} 