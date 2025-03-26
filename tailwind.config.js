/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white:"#F9F8F3",
        white300:"#E8E5DC",
        beige: "#DFCFB4",
        beige300: "#CFB07B",
        yellow: "#FFDF71",
        yellow200:"#FCCF0C",
        yellow400:"#F4B303",
        orange: "#FD7135",
        pink: "#F79597",
        pink200: "#D9667E",
        red: "#DC4E42",
        teal: "#4B9D85",
        teal300: "#067B7D",
        teal500: "#01504A",
        teal700: "#27403E",
      },
      fontFamily: {
        chocolateClassicalSans : ["Chocolate Classical Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        youngSerif: ["Young Serif", "serif"]
      },
      screens: {
        "500": "500px",
        "575": "575px",
        "990": "990px",
        "1440": "1440px"
      }
    },
  },
  plugins: [],
}

