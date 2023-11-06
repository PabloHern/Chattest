/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      text: "#0a0001",
      background: "#ffffff",
      primary: "#14ada3",
      secondary: "#bbbff7",
      accent: "#18cdc1",
    },
    extend: {
      backgroundImage: {
        background: "#f1e6df",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
