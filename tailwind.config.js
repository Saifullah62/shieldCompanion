/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#131838',
          light: '#1f2959',
          dark: '#0c0f24'
        },
        accent: {
          DEFAULT: '#ba9665',
          light: '#cba77c',
          dark: '#a6855a'
        },
        neutral: {
          DEFAULT: '#605952',
          light: '#776e66',
          dark: '#4a443f'
        }
      }
    },
  },
  plugins: [],
}
