/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      maingreen: "#28926E",
      mainblue: "#0273BF",
      bggray: "#F6F8F7",
      bgdarkgray: "#343434",
      white: "#FFFFFF",
    },
    extend: {
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
