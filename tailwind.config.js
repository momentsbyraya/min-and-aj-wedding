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
          primary: '#E8B4B8',
          dusty: '#D4A0A8',
          soft: '#F0C9CE',
          pale: '#F7E0E3',
          cream: '#FBF3F0',
          ivory: '#FFF8F7',
          mauve: '#B07D86',
          deep: '#8B5560',
          champagne: '#E8D5C4',
        },
        'wedding': {
          50: '#FFF8F7',
          100: '#FBF3F0',
          200: '#F7E0E3',
          300: '#F0C9CE',
          400: '#E8B4B8',
          500: '#D4A0A8',
          600: '#B07D86',
          700: '#8B5560',
          800: '#6E424B',
          900: '#4A2C33',
        },
        'rose': {
          50: '#FFF8F7',
          100: '#F7E0E3',
          200: '#F0C9CE',
          300: '#E8B4B8',
          400: '#D4A0A8',
          500: '#B07D86',
          600: '#8B5560',
          700: '#6E424B',
          800: '#4A2C33',
          900: '#2F1B20',
        },
        'gold': {
          50: '#FFF8F7',
          100: '#FBF3F0',
          200: '#E8D5C4',
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