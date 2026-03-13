/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: "#E8621A",
          dark: "#C44E0E",
          deep: "#A33B08",
          light: "#F28B4E",
          soft: "#F7C4A3",
          pale: "#FEF2EB",
        },
        ink: {
          DEFAULT: "#181412",
          mid: "#3D3530",
          light: "#7A6F6A",
        },
        sand: {
          DEFAULT: "#BDB5AE",
          light: "#E2DDD8",
          pale: "#F0ECE8",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
