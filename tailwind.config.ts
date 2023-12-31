import type {Config} from "tailwindcss";
import {fontFamily} from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {"300": "#D9D9D9", 400: "#5D6570", 950: "#000201"},
        amber: {"200": "#FFE897"},
        green: {"200": "#B7FF9E"},
        emerald: {"200": "#BFFAAB"},
        blue: {"200": "#B7D4FF", "500": "#418EFF"},
        fuchsia: {"400": "#FF8EDC"},
      },
    },
    fontSize: {
      xs: ["1.875vw", {}],
      sm: ["2.343vw", {}],
      md: ["3.164vw", {}],
      base: ["7.695vw", {}],
      lg: ["1.015vw", {}],
      xl: ["6.054vw", {lineHeight: "0.89em"}],
      custom: ['2.2rem', { lineHeight: '2.5rem' }], // Custom font size
      masthead: ['16rem', { lineHeight: '2.5rem' }], // Custom font size
    },
    fontFamily: {
      "futura-pt": ["'Futura PT'", ...fontFamily.sans],
      "le-major": ["'Le Major'", ...fontFamily.sans],
      helvetica: ["'Helvetica'", ...fontFamily.sans],
    },
    backgroundImage: {
      100: `linear-gradient(90deg, #B7FF9E 19.27%, #8EFF67 101.8%)`,
      200: `linear-gradient(90deg, #418EFF 19.27%, #104BA4 101.8%)`,
      300: `linear-gradient(90deg, rgba(255, 142, 220, 0.98) 19.27%, #D60094 101.8%)`,
      400: `linear-gradient(90deg, #FFE897 19.27%, #EABD4A 101.8%)`,
      500: `linear-gradient(90deg, #B7D4FF 19.27%, #004FC6 101.8%)`,
      600: `linear-gradient(116deg, #3B3B3B 17.99%, #0B0F1B 94.7%)`,
      700: `linear-gradient(90deg, #BFFAAB 19.27%, #3EEF00 101.8%);`,
      800: `linear-gradient(116deg, #3A3A3A 17.99%, #04160E 94.7%)`,
      900: `linear-gradient(116deg, #453A38 17.99%, #271F1D 94.7%)`,
      1000: `linear-gradient(116deg, #272727 17.99%, #151412 94.7%)`,
    },
  },
  plugins: [],
};
export default config;
