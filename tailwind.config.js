/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      Noto: ["Noto Sans KR", "sans-serif"],
      Prompt: ["Prompt", "sans-serif"],
    },
  },
  plugins: [],
};
