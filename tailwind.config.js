/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["DM Sans", "sans-serif"],
      },
      colors: {
        grayf5: "#F5F7FA",
        primary: "#ff65f2",
        secondary: "#fcb564",
      },
    },
  },
  plugins: [],
};
