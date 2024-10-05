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
        navIcon: {
          DEFAULT: "#ffd100", // Yellow for nav icons
          light: "#ffee32", // Light yellow for nav icons
        },
      },
      boxShadow: {
        "light-sm": "0 1px 2px 0 rgba(19, 19, 26, 0.1)",
        "light-md":
          "0 4px 6px -1px rgba(19, 19, 26, 0.1), 0 2px 4px -2px rgba(19, 19, 26, 0.1)",
        "light-lg":
          "0 10px 15px -3px rgba(19, 19, 26, 0.1), 0 4px 6px -4px rgba(19, 19, 26, 0.1)",
        "light-xl":
          "0 20px 25px -5px rgba(19, 19, 26, 0.1), 0 8px 10px -6px rgba(19, 19, 26, 0.1)",
        "light-2xl": "0 25px 50px -12px rgba(19, 19, 26, 0.1)",
      },
    },
  },
  variants: {
    boxShadow: ["responsive", "dark"], // Enable dark mode variants for shadows
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
