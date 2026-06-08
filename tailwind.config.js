/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        ember: {
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
        },
        gold: {
          400: "#facc15",
          500: "#eab308",
        },
        ink: {
          900: "#140b06",
          800: "#1c110a",
          700: "#2a1a10",
        },
      },
      fontFamily: {
        display: ['"Clash Display"', '"Poppins"', "system-ui", "sans-serif"],
        sans: ['"Poppins"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(249,115,22,0.55)",
        card: "0 20px 45px -20px rgba(0,0,0,0.55)",
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(circle at 30% 20%, rgba(249,115,22,0.25), transparent 55%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};
