/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      "brand": "#ff7b72",
    },
    fontFamily: {
      sans: ['var(--font-noto-sans-kr)'],
      mono: ['var(--font-roboto-mono)'],
    },
    borderRadius: {
      DEFAULT: "16px",
    },
    boxShadow: {
      "inner": "inset 2px 2px 7px #b0a0c0",
      DEFAULT: "2px 2px 7px #b0a0c0",
    },
    keyframes: {
      upFadeIn: {
        "0%": { opacity: "0", transform: "translateY(20px)" },
        "100%": { opacity: "1", transform: "translateY(0px)" },
      },
    },
    extend: {},
  },
  plugins: [],
}
