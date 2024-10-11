/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
       primary:"",
       secondary:"",
       black:{
        DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
       },
       gray:{
        100: "#CDCDE0",
       },
       red:"#E33838",
      },
      fontFamily: {
        mregular: ["Montserrat-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
