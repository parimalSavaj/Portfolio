/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        aurora: {
          night: "#0F172A",
          purple: "#A855F7",
          blue: "#3B82F6",
          text: "#FFFFFF",
          muted: "#94A3B8",
        },
      },
      animation: {
        grid: "grid 20s linear infinite",
      },
      keyframes: {
        grid: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
