/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: "#6FC276",
        greener: "#4d9653",
        rose: "#d09696",
        orange: "#fda64a",

      }
    },
  },
  plugins: [],
}

