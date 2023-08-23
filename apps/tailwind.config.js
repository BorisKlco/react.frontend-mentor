/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
        ibm: ["IBM Plex Mono"],
        handwriting: ["Borel"],
      },
    },
  },
  plugins: [],
};
