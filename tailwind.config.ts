import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
          "CooperBlack",
          "CBBOutline",
          "Reenie-Beanie",
        ],
      },
      colors: {
        "primary": "#2C3F6A",
        "secondary-100": "#F3F6BB",
        "secondary-200": "#BABD8A",
        "secondary-300": "#585B19",
        "red-line-100": "#A80000",
        "red-line-200": "#6B0000",
        "link-blue": "#012D91",
        "link-blue-hover": "#00ABD8",
      }
    },
  },
  plugins: [],
} satisfies Config;
