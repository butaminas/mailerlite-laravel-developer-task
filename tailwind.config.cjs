/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/js/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            sans: ["Inter"],
            serif: ["Inter"],
            mono: ["Inter"],
            display: ["Inter"],
            body: ["Inter"]
        },
        extend: {
            colors: {
                primary: "#0ac269",
                secondary: "#404040"
            }
        }
    },
    plugins: [require("daisyui")],

    daisyui: {
        themes: [{
            emerald: {
                ...require("daisyui/src/colors/themes")["[data-theme=light]"],
                primary: "#0ac269",
                "primary-focus": "#069b54",
                "primary-content": "#ffffff",
                secondary: "#404040",
                "secondary-focus": "#474747",
                "secondary-content": "#ffffff",
                accent: "#bbdccc",
                "accent-focus": "#8baf9d",
                "accent-content": "#ffffff",
                neutral: "#0ac269",
                "neutral-focus": "#bbdccc",
                "neutral-content": "#ffffff",
                "base-content": "#000",
                info: "#66c6ff",
                success: "#2dd36f",
                warning: "#ffc409",
                error: "#eb445a",
                "base-100": "#ffffff",
                "base-200": "#F2F2F2",
                "base-300": "#E5E6E6",
                "--rounded-btn": "1.9rem"
            },
            luxury: {
                ...require("daisyui/src/colors/themes")["[data-theme=luxury]"],
                "--rounded-btn": "1.9rem",
                primary: "#0ac269",
                "primary-focus": "#069b54",
                "primary-content": "#ffffff",
                secondary: "#d5d5d5",
                "secondary-focus": "#d5d5d5",
                "secondary-content": "#000000",
                accent: "#bbdccc",
                "accent-focus": "#8baf9d",
                "accent-content": "#ffffff",
                neutral: "#0ac269",
                "neutral-focus": "#044123",
                "neutral-content": "#ffffff",
                "base-content": "#fff",
                info: "rgb(51,51,51)",
                success: "#2fdf75",
                warning: "#ffd534",
                error: "#ff4961",
                "base-100": "#1a1a1a",
                "base-200": "#171618",
                "base-300": "#2e2d2f"
            }
        }],
        darkTheme: "luxury"
    },
}
