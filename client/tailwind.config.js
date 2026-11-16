module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        animation: {
            blink: "blink 1s step-end infinite",
            "hib-enter": "hibEnter 420ms ease-out both",
            "hib-panel-in": "hibPanelIn 220ms ease-out both",
            "hib-stage-focus": "hibStageFocus 280ms ease-out",
            "hib-console-next": "hibConsoleNext 240ms ease-out both",
            "hib-console-prev": "hibConsolePrev 240ms ease-out both",
            "hib-from-left": "hibFromLeft 380ms ease-out both",
            "hib-from-right": "hibFromRight 380ms ease-out both",
            "hib-line-in": "hibLineIn 420ms ease-out both",
        },
        keyframes: {
            blink: {
                "0%, 100%": { opacity: "0" },
                "50%": { opacity: "1" },
            },
            hibEnter: {
                "0%": { opacity: "0", transform: "translateY(0.5rem)" },
                "100%": { opacity: "1", transform: "translateY(0)" },
            },
            hibPanelIn: {
                "0%": { opacity: "0", transform: "translateY(0.35rem)" },
                "100%": { opacity: "1", transform: "translateY(0)" },
            },
            hibStageFocus: {
                "0%": { transform: "scale(0.985)" },
                "100%": { transform: "scale(1)" },
            },
            hibConsoleNext: {
                "0%": { opacity: "0.15", transform: "translateX(0.4rem)" },
                "40%": { opacity: "0.55" },
                "100%": { opacity: "1", transform: "translateX(0)" },
            },
            hibConsolePrev: {
                "0%": { opacity: "0.15", transform: "translateX(-0.4rem)" },
                "40%": { opacity: "0.55" },
                "100%": { opacity: "1", transform: "translateX(0)" },
            },
            hibFromLeft: {
                "0%": { opacity: "0", transform: "translateX(-0.6rem)" },
                "100%": { opacity: "1", transform: "translateX(0)" },
            },
            hibFromRight: {
                "0%": { opacity: "0", transform: "translateX(0.6rem)" },
                "100%": { opacity: "1", transform: "translateX(0)" },
            },
            hibLineIn: {
                "0%": { opacity: "0" },
                "100%": { opacity: "1" },
            },
        },
        fontFamily: {
            mono: ['"Share Tech Mono"', 'monospace'],
        },
    },
  },
};