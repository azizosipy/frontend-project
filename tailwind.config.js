/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customPurple: "#8c52ff", // You can name this color anything you like
        customorange: "#feb823",
        customyellow: "#f9643f",
      },
      fontFamily: {
        markyte: ["Marykate", "sans-serif"], // Correctly extend the font family here
      },
    },
  },
  plugins: [],
};
