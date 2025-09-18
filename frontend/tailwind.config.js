/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "register-bg": "url('/slicedSausage.svg')",
        "login-bg": "url('/salamiSlice.svg')",
        "stepCard-bg": "url('/salumeSlice.svg')",
        "account-bg": "url('/charcuterie.svg')",
      },
      colors: {
        salumeBlue: "#759281",
        salumeWhite: "#ffebae",
        hoverSalumeWhite: "#ffe699",
        eggshell: "rgb(250,240,225)",
        wetSand: "rgb(170,100,55)",
        stone: "rgb(50,50,50)",
        flesh: "rgb(235, 212, 192)",
      },
      fontFamily: {
        Satisfy: ["Satisfy", "cursive"],
        Montserrat: ["Montserrat-VariableFont-wght", "sans-serif"],
      },
      animation: {
        "text-slide":
          "text-slide 12.5s cubic-bezier(0.83, 0, 0.17, 1) infinite",
      },
      keyframes: {
        "text-slide": {
          "0%, 20%": {
            transform: "translateY(0%)",
          },
          "21%, 40%": {
            transform: "translateY(-20%)",
          },
          "41%, 60%": {
            transform: "translateY(-40%)",
          },
          "61%, 80%": {
            transform: "translateY(-60%)",
          },
          "81%, 100%": {
            transform: "translateY(-80%)",
          },
        },
      },
    },
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"],
  },
  plugins: [],
};
