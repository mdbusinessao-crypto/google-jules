/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand accent (golden amber)
        brand: {
          300: "#f3c879",
          400: "#efb957",
          500: "#E8A020",
          600: "#cf8612",
          700: "#a96a0e",
        },
        // Warm red / ember
        ember: {
          400: "#d65a4c",
          500: "#C0392B",
          600: "#a52e22",
          700: "#8B1A1A",
        },
        burgundy: {
          900: "#5e1212",
          800: "#6e1414",
          700: "#8B1A1A",
          600: "#a52121",
        },
        gold: {
          400: "#E8A020",
          500: "#cf8612",
        },
        cream: "#F5F0E8",
        offwhite: "#FAF7F2",
        ink: {
          900: "#2a0a0a",
          800: "#3a0e0e",
          700: "#4a1414",
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', '"Oswald"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 45px -10px rgba(232,160,32,0.55)",
        card: "0 24px 50px -22px rgba(0,0,0,0.55)",
        food: "0 35px 60px -25px rgba(0,0,0,0.7)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(6deg)" },
        },
        floatBig: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.5" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
      },
      animation: {
        drift: "drift 4s ease-in-out infinite",
        floatBig: "floatBig 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
