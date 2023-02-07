/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
        black: "#000000",
        white: "#FFFFFF",
        gray: "BAC4D0",
        purple: {
          light: "#D4C7E9",
          strong: "#A98FD3"
        },
        orange: "#FAA613"
    },
    spacing: {
      "tiny": "0.375rem",
      "small": "1rem",
      "medium": "2.5rem",
      "lg": "5rem",
      "xl": "10rem"
    },
    borderRadius: {
      "small": "0.125rem",
      "medium": "0.375rem",
      "big": "0.75rem",
      "full": "100%"
    },
  },
  plugins: [],
}
