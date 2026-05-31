export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        script: ["Dancing Script", "cursive"],
        body: ["Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 55px rgba(248, 194, 95, 0.28)"
      }
    }
  },
  plugins: []
};
