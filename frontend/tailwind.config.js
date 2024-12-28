/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          600: "#5046e4",
          500: "#4a3ec8",
          400: "#e0e7ff"
        }
      }
    },
  },
  plugins: [],
};
