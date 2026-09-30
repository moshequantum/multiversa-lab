/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: "#09090b",
        surface: "#121217",
        card: "#181820",
        ivory: "#f8f9fa",
        sand: "#dcd7cb",
        muted: "#8e8e99",
        copy: "#c3c3cc",
        gold: "#e6c364",
        primary: {
          DEFAULT: "#d4af37",
          hover: "#c59f2a",
        },
        secondary: "#6366f1",
      },
      fontFamily: {
        sans: ["Sora", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
