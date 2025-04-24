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
        beige500: "#917262",
        yellow: "#FFFCC9",
        yellow200:"#FFEF88",
        yellow300:"#FFD28F",
        yellow400:"#FFC444 ",
        orange: "#FF841F",
        orange100: "#FFC89A",
        orange600: "#9B4A24",
        orange900: "#62381F",
        pink: "#F79597",
        pink200: "#D9667E",
        red: "#DC4E42",
        teal: "#4B9D85",
        teal300: "#067B7D",
        teal500: "#01504A",
        teal700: "#27403E",
        blue100: "#92CEDD",
        blue200: "#23B5FE",
        blue300: "#354DFF",
        blue400: "#2825B4",
        blue500: "#1B2B8C",
        blue800: "#13164A",
        blue900: "#1A1B33"
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
      },
      keyframes : {
        popIn: {
          "0%" : { transform: "scale(0.5)", opacity: "0" },
          "80%" : { transform: "scale(1.2)", opacity: "1" },
          "100%" : { transform: "scale(1)" }
        },
        noiseEffect : {
          "0%" : {backgroundPosition: "0 0"},
          "100%" : {backgroundPosition: "100% 100%"}
        }

      },
      animation: {
        popIn: "popIn 1s ease-in-out",
        noiseEffect: "noiseEffect 1s steps(10) infinite"
      }
    },
  },
  plugins: [],
}