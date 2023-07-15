/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "tech-primary-1": "#358FE1",
      },
      width: {
        100: "550px",
      },
    },
  },
  plugins: [],
};
