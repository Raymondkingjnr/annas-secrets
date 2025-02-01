import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        base_color: "#309185",
        secondary_color: "#FFB23F",
        text_color: "#AFADB5",
      },
      fontFamily: {
        font: "Dancing Script",
        font2: "Abril Fatface",
      },
    },
  },
  plugins: [require("daisyui")],
} satisfies Config;
