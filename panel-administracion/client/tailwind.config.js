/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        white: "#fafafa",
        black: "#333333",
        primary: "#06163A",
        primaryHover: "#0d2252",
        secondary: "#ff3514",
        secondaryHover: "#a3210b"
      }
    },
  },
  plugins: [],
}

