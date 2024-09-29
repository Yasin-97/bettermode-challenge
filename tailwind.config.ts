import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#8c6dfd", // Light purple
          DEFAULT: "#3a3a43", // Dark grey
          dark: "#2c2f32", // Darker grey
        },
        secondary: {
          light: "#4acd8d", // Light green
          DEFAULT: "#808191", // Grey
          dark: "#4b5264", // Dark grey
        },
        background: {
          light: "#2c2f32", // Light background
          DEFAULT: "#1c1c24", // Default dark background
          dark: "#13131a", // Dark background
        },
      },
    },
  },
  variants: {
    boxShadow: ["responsive", "dark"], // Enable dark mode variants for shadows
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
