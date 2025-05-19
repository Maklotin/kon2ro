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
          "Courier-New",
        ],
      },
      colors: {
        primary: "#2C3F6A",
        "secondary-100": "#F3F6BB",
        "secondary-200": "#BABD8A",
        "secondary-300": "#585B19",
        "secondary-hover-100": "#BDDC8E",
        "red-line-100": "#A80000",
        "red-line-200": "#6B0000",
        "link-blue-100": "#012D91",
        "link-blue-200": "#00ABD8",
        "link-blue-300": "#69C6E2",
      },
    },
  },
  plugins: [],
} satisfies Config;
