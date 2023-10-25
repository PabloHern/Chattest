/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'text': 'rgb(var(--text))',
      'background': 'rgb(var(--background))',
      'primary': 'rgb(var(--primary))',
      'secondary': 'rgb(var(--secondary))',
      'accent': 'rgb(var(--accent))',
    },
    extend: {
      backgroundImage: {
        'background': '#f1e6df'
      },
    },
  },
  plugins: [],
}
