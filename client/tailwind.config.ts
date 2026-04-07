import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      boxShadow: {
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
      colors: {
                'brand-blue': 'hsl(var(--brand-blue))',

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#e8ebf5",
          100: "#c2c9e5",
          200: "#9ba7d5",
          300: "#7485c5",
          400: "#4d63b5",
          500: "#0B1B4F",
          600: "#091648",
          700: "#071241",
          800: "#050e3a",
          900: "#030a33",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "#e8f0ff",
          100: "#c2d9ff",
          200: "#9bc2ff",
          300: "#74abff",
          400: "#4d94ff",
          500: "#1e3a8a",
          600: "#172f6e",
          700: "#102453",
          800: "#0a1937",
          900: "#050e1c",
        },
        neutral: {
          50: "#F3F4F6",
          100: "#e5e7eb",
          200: "#d1d5db",
          300: "#9ca3af",
          400: "#6b7280",
          500: "#4b5563",
          600: "#374151",
          700: "#1f2937",
          800: "#111827",
          900: "#030712",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "Inter", "sans-serif"],
      },
      animation: {
        gradient: "gradient 15s ease infinite",
        shimmer: "shimmer 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-in-down": "fade-in-down 0.8s ease-out both",
        "scroll-left": "scroll-left 20s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "0% 50%",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "100% 50%",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
