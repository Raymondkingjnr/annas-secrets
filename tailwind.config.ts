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
      animation: {
        scroll: "scrollAnimation 20s linear infinite",
      },
      keyframes: {
        scrollAnimation: {
          to: { transform: "translateX(calc(-50% - 22.5px))" },
        },
      },
      fontFamily: {
        font: "Dancing Script",
        font2: "Abril Fatface",
      },
    },
  },
  plugins: [],
} satisfies Config;
