/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      black: "#000000",
      white: "#FFFFFF",
      lightblue: "#D2EBFA",
      purple: {
        light: "#B9AAE1",
        medium: "#9187F4",
        dark: "#280060",
      },
      yellow: "#FFC200",
      danger: "#DC2626",
    },
    fontFamily: {
      latoSans: ["Lato Sans", "sans-serif"],
    },
    plugins: [],
  },
}
