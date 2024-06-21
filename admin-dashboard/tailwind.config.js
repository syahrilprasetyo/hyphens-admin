/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "outline-blue": "0 0 1px #2196F3",
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["focus"],
    },
  },
  plugins: [],
};
