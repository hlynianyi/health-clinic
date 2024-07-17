/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Helvetica, Arial, sans-serif",
      },
      colors: {
        "gray-bg": "#F6F8F7",
      },
    },
  },
  plugins: [],
};
