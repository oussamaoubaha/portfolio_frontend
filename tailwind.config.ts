import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "rgba(255, 255, 255, 0.08)",
        input: "rgba(255, 255, 255, 0.03)",
        ring: "#3B82F6",
        background: "#050A14",
        foreground: "#F8FAFC",
        primary: {
          DEFAULT: "#3B82F6",
          foreground: "#F8FAFC",
        },
        secondary: {
          DEFAULT: "#06B6D4",
          foreground: "#F8FAFC",
        },
        muted: {
          DEFAULT: "#64748B",
          foreground: "#F8FAFC",
        },
        card: {
          DEFAULT: "rgba(255, 255, 255, 0.03)",
          foreground: "#F8FAFC",
        },
      },
      fontFamily: {
        display: ["Clash Display", "Space Grotesk", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-subtle": {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(var(--primary), 0.4)" },
          "50%": { transform: "scale(1.05)", boxShadow: "0 0 20px 0 rgba(var(--primary), 0.2)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "pulse-subtle": "pulse-subtle 2s infinite ease-in-out",
        "spin-slow": "spin-slow 8s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
