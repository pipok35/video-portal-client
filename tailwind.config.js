/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#323536',
          hover: '#3f4143'
        },
        layout: {
          DEFAULT: '#1a1d1e'
        },
        background: {
          DEFAULT: '#262a2b'
        }
      }
    }
  },
  plugins: []
}
