/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        light_blue: "rgb(47, 93, 138)",
        blue_400: "rgb(114, 126, 142)",
        blue_800: "rgb(57, 107, 174)",
        blue_700: "rgb(74, 111, 161)",
        light_white: "rgba(255, 255, 255, 0.75)",
        blue_bg: "rgba(58, 176, 255, 0.1)",
      dark_text: "rgb(161, 185, 206)",
      }
    },
  },
  plugins: [],
}