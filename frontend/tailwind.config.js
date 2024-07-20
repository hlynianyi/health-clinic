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
      red: "#FF0101",
      green: "#1CFF01",
      yellow: "#FBFF01",
      blue: "#0501FF",
      purple: "#E001FF",
      black: "#000000",
    },
    extend: {
      screens: {
        tablet: "640px",
        laptop: "1024px",
        desktop: "1280px",
        large: "1430px",
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
