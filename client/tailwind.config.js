/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  purge: ["src/**/*.js", "src/**/*.jsx", "public/**/*.html"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      gray1: "#15181C",
      gray2: "#36383C",
      gray3: "#16181D",
      gray4: "#0A0B0D",
      blue1: "#4199FF",
      blue2: "#0891EA",
      blue3: "#0A59A4",
      red: "#C72706",
      green: "#299C3F",
      white: "#FFFFFF",
    },
  },
  plugins: [],
};
