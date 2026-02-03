/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Main brand colors - Navy Blue (#151361) & Light Blue (#a7ccff) theme
        brand: {
          primary: "#151361",
          "primary-dark": "#0d0a3d",
          "primary-light": "#1f1a85",
          accent: "#a7ccff",
          "accent-dark": "#8ab4f0",
          "accent-light": "#c8e6ff",
          background: "#f8f9ff",
          "background-dark": "#e8ebf7",
          // Legacy color names for backwards compatibility
          brown: "#151361",
          "brown-dark": "#0d0a3d",
          "brown-light": "#1f1a85",
          cream: "#f8f9ff",
          "cream-dark": "#e8ebf7",
          gold: "#a7ccff",
          "gold-dark": "#8ab4f0",
          red: "#151361",
          "red-dark": "#0d0a3d",
        },
        // Accent colors
        accent: {
          yellow: "#a7ccff",
          orange: "#7da8e8",
          pink: "#e8f2ff",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        body: ["Lato", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.6s ease-out",
        "slide-in-right": "slideInRight 0.6s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      boxShadow: {
        brand: "0 4px 20px rgba(107, 44, 44, 0.15)",
        "brand-lg": "0 10px 40px rgba(107, 44, 44, 0.2)",
        gold: "0 4px 20px rgba(212, 175, 55, 0.3)",
      },
    },
  },
  plugins: [],
};
