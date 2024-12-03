/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#06163A",
        primaryHover: "#0d2252",
        secondary: "#ff3514",
        secondaryHover: "#a3210b"
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif']
      },
      animation: {
        'bg-change': 'bgChange 1s infinite', // Animación personalizada
        'fade-out': 'fadeOut 5s'
      },
      keyframes: {
        bgChange: {
          '0%': { backgroundColor: '#ddd' }, // Rojo al inicio
          '50%': { backgroundColor: '#eee' }, // Azul a la mitad
          '100%': { backgroundColor: '#ddd' }, // Rojo al final
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { opacity: '0' }
        }
      },
    },
    plugins: [],
  }
}

