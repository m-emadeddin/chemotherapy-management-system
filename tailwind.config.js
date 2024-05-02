module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        gray: {
          50: "#f8f9fc",
          100: "#f4f5f9",
          400: "#c2c2c2",
          600: "#707070",
          "50_01": "#f7f9fb",
          700: "#5a5a5a",
          800: "#d4d4d4",
        },
        white: { A700: "#ffffff" },
        blue: { 500: "#1fa6ef" },
        black: { 900: "#000000" },
        blue_gray: { 300: "#8c9ab3", "300_02": "#8e9cb4" },
        blue_gray_400: "#77859c",
        transparent: { 0: "transparent" },
      },
      boxShadow: { xs: "0px 4px 10px 0px #00000026" },
      fontFamily: { lamasans: "Lama Sans", almarai: "Almarai", inter: "Inter" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
