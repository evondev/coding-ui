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
        secondary: ["Intervar", "sans-serif"],
        code: ["SF mono", "sans-serif"],
      },
      colors: {
        grayf5: "#F5F7FA",
        primary: "#fc6c8f",
        secondary: "#fcb564",
        third: "#6a5af9",
        fourth: "#d66efd",
      },
    },
  },
  plugins: [],
};
