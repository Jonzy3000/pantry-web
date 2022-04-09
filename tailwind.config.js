module.exports = {
  content: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Lora"],
    },
    extend: {
      colors: {
        "accent-1": "#333",
      },
      boxShadow: {
        outline: "0 2px 8px 0 rgba(0,21,80,0.15)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
