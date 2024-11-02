/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow:{
        'custom': '0 0 0 1px rgba(0, 0, 0, .1), 0 2px 4px 1px rgba(0, 0, 0, .18)',
      },
      keyframes: {
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadein: 'fadein 0.3s ease forwards',
      },
    },
  },
  plugins: [],
}