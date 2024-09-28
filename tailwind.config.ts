import config from "./appConfig";
import { Config as TailwindConfig } from "tailwindcss/types";

const tailwind: TailwindConfig = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/globals.css",
  ],
  theme: {
    extend: {
      // Add a custom theme options
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    // Main theme. See more at: https://daisyui.com/docs/themes
    themes: [config.theme.main],
  },
};

export default tailwind;
