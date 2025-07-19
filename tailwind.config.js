/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'miktos-primary': '#6366f1',
        'miktos-secondary': '#8b5cf6',
        'miktos-accent': '#d946ef',
        'miktos-dark': '#0a0a0f',
        'miktos-surface': '#1f1f2e',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}