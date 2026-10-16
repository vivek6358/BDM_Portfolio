import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "390px",
      },
      colors: {
        dark: {
          bg: "#050706",
          secondary: "#09110D",
          surface: "#0D1712",
          card: "#0D1712",
          elevated: "#121F19",
          border: "#1A3025",
          "border-hover": "rgba(0, 200, 120, 0.35)",
        },
        emerald: {
          DEFAULT: "#00C878",
          bright: "#20E58A",
          muted: "#0E8A54",
          dark: "#08472A",
          glow: "rgba(0, 200, 120, 0.15)",
        },
        slate: {
          100: "#F4F7F5",
          200: "#E3ECE6",
          300: "#C2D1C9",
          400: "#9AA7A0",
          500: "#6F7E76",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        widest: "0.2em",
        tightest: "-0.03em",
      },
      boxShadow: {
        "glow-emerald": "0 0 25px -4px rgba(0, 200, 120, 0.22)",
        "glow-emerald-sm": "0 0 12px -2px rgba(0, 200, 120, 0.18)",
        "card-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.55)",
      },
      animation: {
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
