/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        Black: "#11151D",
        secondary: "#222D41",
        white: "#ffffff",
        myGrey: "#374158",
        brique1: "#7F5056",
        brique2: "#D76C58",
        silver: "#ecebff",
        brique3: "#EF6C00",
        brique4: "#FFEEA7",
      },
      backgroundImage: {
        "background-image": "url('/src/assets/background/bg-main.png')",
      },
    },
  },
  plugins: [],
};
