module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        animation: {
            blink: "blink 1s step-end infinite",
        },
        keyframes: {
            blink: {
                "0%, 100%": { opacity: "0" },
                "50%": { opacity: "1" },
            },
        },
        fontFamily: {
            mono: ['"Share Tech Mono"', 'monospace'],
        },
    },
  },
};