/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class", // ✅ Required
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
