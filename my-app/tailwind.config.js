/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#63bc46",
        secondary: "#1f2c4c",
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
        red: "#E33838",
      },
      fontFamily: {
        dBold: ["Din-pro-bold", "sans-serif"],
        dLight: ["Din-pro-light", "sans-serif"],
        dMed: ["Din-pro-med", "sans-serif"],
        mrgular: ["Merienda-Regular"],
        mrbold: ["Merienda-Bold"],
        mnblack: ["Montserrat-Black"],
        mnbold: ["Montserrat-Bold"],
        mnlight: ["Montserrat-Light"],
        mnmedium: ["Montserrat-Medium"],
        mnregular: ["Montserrat-Regular"],
        mnsemibold: ["Montserrat-SemiBold"],
        mnthin: ["Montserrat-Thin"],
      },
    },
  },
  plugins: [],
};
