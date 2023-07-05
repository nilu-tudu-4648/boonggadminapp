/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [],
  theme: {
    fontFamily: {
      // Montserrat: ["Montserrat_400Regular"],
      // MontserratMedium: ["Montserrat_500Medium"],
      // MontserratSemiBold: ["Montserrat_600SemiBold"],
      // MontserratBold: ["Montserrat_700Bold"],
      // MontserratExtraBold: ["Montserrat_800ExtraBold"],
      // MontserratBlack: ["Montserrat_900Black"],
    },
    extend: {
      colors: {
        primary: colors.red["400"],
        secondary: colors.neutral["200"],
      },
    },
  },
  plugins: [],
};
