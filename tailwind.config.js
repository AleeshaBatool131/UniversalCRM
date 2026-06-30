/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0B1320",
          900: "#101A2C",
          800: "#16213A",
          700: "#1E2C49",
        },
        brand: {
          50: "#EEF4FF",
          100: "#D9E6FF",
          200: "#B4CCFF",
          300: "#86ABFF",
          400: "#5A86F7",
          500: "#3A63E0",
          600: "#2C4ABF",
          700: "#23399A",
        },
        gold: {
          400: "#E7B95B",
          500: "#D6A23F",
        },
        slate: {
          25: "#F7F8FB",
        },
      },
      fontFamily: {
        display: ["'Sora'", "system-ui", "sans-serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,26,44,0.04), 0 8px 24px rgba(16,26,44,0.06)",
        soft: "0 4px 16px rgba(16,26,44,0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
