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
    },
    // spacing: {
    //   tiny: "0.375rem",
    //   small: "1rem",
    //   medium: "2.5rem",
    //   lg: "5rem",
    //   xl: "10rem",
    // },
    // borderRadius: {
    //   small: "0.125rem",
    //   medium: "0.375rem",
    //   big: "0.75rem",
    //   full: "100%",
    // },
    fontFamily: {
      anekbangla: ["Anek Bangla", "sans-serif"],
    },
    plugins: [],
  },
}
