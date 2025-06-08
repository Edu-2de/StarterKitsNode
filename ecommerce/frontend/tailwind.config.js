const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      ...colors,
      primary: "#1d74cb",
      secondary: "#A9C5A0",
      accent: "#E9C46A",
      background: "#F6F5F2",
      surface: "#fff",
      text: "#22223B",
      muted: "#888888",
      shadow: "#00000011",
      border: "#e5e5e5",
    },
    extend: {
      boxShadow: {
        soft: "0 2px 8px 0 #00000011",
        strong: "0 4px 24px 0 #00000022",
      },
    },
  },
  plugins: [],
}