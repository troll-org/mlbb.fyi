/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      sm: "0.8rem",
      base: ["16px", "100px"],
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      default: ["16px", "100px"],
    },
    extend: {
      colors: {
        deepocean: "#030F1C",
        ocean: "#011829",
        sea: "#4DA2FF",
        aqua: "#C0E6FF",
        cloud: "#FFFFFF",
      },
      fontFamily: {
        heading: ["var(--font-heading)", ...fontFamily.sans],
        sat: ["var(--font-satoshi)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
