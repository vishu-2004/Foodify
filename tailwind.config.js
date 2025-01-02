/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./Screens/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}","./authScreens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primaryOrange:"#FC8019"
      },
      fontFamily: {
        Poppins: ["Poppins", "sans"],
        PoppinsLight: ["Poppins-Light", "sans"],
        PoppinsMedium: ["Poppins-Medium", "sans"],
        PoppinsSemiBold: ["Poppins-SemiBold", "sans"],
        PoppinsBold: ["Poppins-Bold", "sans"],
        PoppinsBlack: ["Poppins-Black", "sans"],
    },
    },
  },
  plugins: [],
}

