const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
        mono: ["Fira Code", "monospace"],
      },
      colors: {
        "custom-blue": "#1E40AF",
        "custom-red": "#EF4444",
        "custom-color-button": "#403a58",
        "custom-primary-button": "#fb543c",
        "custom-gray": "rgb(245, 245, 245)", // Use rgb format correctly
      },
    },
  },
  plugins: [require("daisyui")],
};
