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
        "ocean-muted": "#6F8F8B",
        sand: {
          100: "#F4ECE2",
          200: "#E8D8C3",
          400: "#C9A97E",
          500: "#B09060",
          600: "#9A7A4A",
          700: "#7A5C38",
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
