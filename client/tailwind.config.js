/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f5f5",
          100: "#d1d1d2",
          200: "#a3a3a5",
          300: "#767677",
          400: "#48484a",
          500: "#1a1a1d",
          600: "#151517",
          700: "#101011",
          800: "#0a0a0c",
          900: "#050506",
        },
      },
      fontFamily: {
        openSans: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
