/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [],
  theme: {
    extend: {
      colors: {
        "bg-accent": "#FF725E",
        "bg-white": "#FFFFFF",
        "bg-input": "#F8F8F8",
        "fg-activated": "#FFFFFF",
        "fg-deactivated": "#8B8B8B",
        "fg-normal-black": "#000000",
        "border-input": "#DEDEDE",
      },
    },
  },
};
