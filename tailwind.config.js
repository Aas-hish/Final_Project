/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // Example blue
        secondary: '#10b981', // Example green
        accent: '#f59e0b', // Example amber
        dark: '#1f2937', // Example dark gray
        light: '#f3f4f6', // Example light gray
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
