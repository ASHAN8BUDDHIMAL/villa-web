import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FDFAF5",
        sand: {
          100: "#F0E9DC",
          200: "#E0D0B8",
          400: "#C4A882",
          500: "#B09060",
          600: "#9A7A4A",
          700: "#7D6038",
        },
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["var(--font-geist-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
