/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        serif: ["'DM Serif Display'", "Georgia", "serif"],
        sans: ["'Instrument Sans'", "sans-serif"],
        arabic: ["'Noto Serif Arabic'", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        forest:  { DEFAULT: "#2D4A22", light: "#3D6130", dark: "#1E3217", muted: "#4A6E3A" },
        gold:    { DEFAULT: "#C8A96E", light: "#D9BF8E", dark: "#A88A4E", pale: "#F0E6D0" },
        cream:   { DEFAULT: "#F5F0E8", dark: "#EAE2D4", deep: "#DDD3C2" },
        ink:     { DEFAULT: "#1A1A14", light: "#2E2E24", muted: "#5C5C4E" },
        rust:    { DEFAULT: "#8B3A2A", light: "#A84A38" },
        slate:   { DEFAULT: "#3A4A52", light: "#4E6270" },
      },
      spacing: { 18: "4.5rem", 22: "5.5rem", 26: "6.5rem" },
      fontSize: {
        "display-2xl": ["clamp(3rem,6vw,5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-xl":  ["clamp(2rem,4vw,3.5rem)",  { lineHeight: "1.1",  letterSpacing: "-0.015em" }],
        "display-lg":  ["clamp(1.5rem,3vw,2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      animation: {
        "fade-up":    "fadeUp 0.6s ease-out both",
        "fade-in":    "fadeIn 0.4s ease-out both",
        "slide-left": "slideLeft 0.5s ease-out both",
        "line-grow":  "lineGrow 0.8s ease-out both",
        "counter":    "counter 2s ease-out both",
        "float":      "float 4s ease-in-out infinite",
        "shimmer":    "shimmer 1.8s ease-in-out infinite",
      },
      keyframes: {
        fadeUp:    { "0%": { opacity: 0, transform: "translateY(24px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        fadeIn:    { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        slideLeft: { "0%": { opacity: 0, transform: "translateX(24px)" }, "100%": { opacity: 1, transform: "translateX(0)" } },
        lineGrow:  { "0%": { width: "0%" }, "100%": { width: "100%" } },
        float:     { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-8px)" } },
        shimmer:   { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
    },
  },
  plugins: [],
};
