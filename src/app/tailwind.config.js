/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      animation: {
        'ping-onetime': 'ping 1s linear'
      }
    },
  },
  plugins: [],
}
