/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "#0a0001",
        background: "#ffffff",
        primary: "#14ada3",
        secondary: "#bbbff7",
        accent: "#18cdc1",
      },
      backgroundImage: {
        background: "#f1e6df",
      },
      height: {
        chatbox: "90%",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
