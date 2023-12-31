/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: '#e2e3f3', // Replace with your color value
        background: '#070817',
        primary: '#9096e4',
        secondary: '#181f8c',
        accent: '#3f4be9',
      },
    },
  },
  plugins: [],
}