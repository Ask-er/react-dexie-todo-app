/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        text: "var(--text)",
        textgray: "var(--textgray)",
        background: "var(--background)",
        backgroundL1: "var(--backgroundL1)",
        backgroundL2: "var(--backgroundL2)",
        backgroundL3: "var(--backgroundL3)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        hover: "var(--hover)",

        primary: {
          50: "#E0F2FF",
          100: "#C2E6FF",
          200: "#80CAFF",
          300: "#33aaff",
          400: "#0095FF",
          500: "#007DD6",
          600: "#0062A8",
          700: "#004A80",
          800: "#003357",
          900: "#001829",
          950: "#000C14",
        },
      },
      animation: {
        blob: "blob 10s infinite",
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideInFromLeft: "slide-in-from-left 0.35s ease-out",
        slideInFromRight: "slide-in-from-right 0.35s ease-out",
        slideOutToRight: "slide-out-to-right 0.35s ease-out",
        roadRunnerIn:
          "roadRunnerIn 0.3s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-in-from-left": {
          "0%": {
            transform: "translateX(-15%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "slide-in-from-right": {
          "0%": {
            transform: "translateX(15%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "slide-out-to-right": {
          "0%": {
            transform: "translateX(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(15%)",
            opacity: "0",
          },
        },
        roadRunnerIn: {
          "0%": {
            transform: "translateX(-1500px) skewX(30deg) scaleX(1.3)",
          },
          "70%": {
            transform: "translateX(30px) skewX(0deg) scaleX(.9)",
          },
          "100%": {
            transform: "translateX(0px) skewX(0deg) scaleX(1)",
          },
        },
      },
      boxShadow: {
        neon: "0px 0px 5px theme('colors.purple.200'), 0 0 20px theme('colors.purple.700')",
      },
      screens: {
        xl: "1150px",
        md2: "910px",
      },
    },
  },
  plugins: [
    plugin(function ({ theme, addUtilities }) {
      const neonUtilities = {};
      const colors = theme("colors");
      for (const color in colors) {
        if (typeof colors[color] === "object") {
          const color1 = colors[color]["400"];
          const color2 = colors[color]["700"];
          neonUtilities[`.neon-${color}`] = {
            boxShadow: `0 0 5px ${color1}, 0 0 20px ${color2}`,
          };
        }
      }
      addUtilities(neonUtilities);
    }),
  ],
};
