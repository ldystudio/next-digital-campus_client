const { fontFamily } = require("tailwindcss/defaultTheme")
const { nextui } = require("@nextui-org/react")
const svgToDataUri = require("mini-svg-data-uri")
const {
    default: flattenColorPalette
} = require("tailwindcss/lib/util/flattenColorPalette")

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        unsplashImages: {
            lyon: "YMi66afAE3I",
            stars: "4dpAqfTbvKA",
            yosemite: "zOXUvQ3Xo3s",
            gradient: "LeG68PrXA6Y"
        },
        unsplashResolutions: {
            default: null, // --- Allows maximum available resolution by default.
            xs: 480,
            sm: 720,
            md: 1280,
            lg: 1920,
            xl: 3840,
            "2xl": 7680
        },
        container: {
            center: true,
            padding: "2rem",
            screens: { "2xl": "1400px" }
        },
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)", ...fontFamily.sans]
            },
            backgroundImage: {
                "error-img": "url('/images/background-pattern.svg')",
                "contour-line": "url('/images/contourLine.svg')",
                "circuit-board": "url('/images/circuitBoard.svg')",
                "blob-scene": "url('/images/blob-scene-haikei.svg')"
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" }
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 }
                },
                meteor: {
                    "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
                    "70%": { opacity: "1" },
                    "100%": {
                        transform: "rotate(215deg) translateX(-500px)",
                        opacity: "0"
                    }
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "meteor-effect": "meteor 5s linear infinite"
            }
        }
    },
    darkMode: "class",
    plugins: [
        addVariablesForColors,
        require("tailwindcss-animate"),
        require("tailwindcss-unsplash"),
        require("tailwind-scrollbar-hide"),
        nextui({
            themes: {
                light: {
                    colors: {
                        secondary: {
                            foreground: "#FFFFFF",
                            DEFAULT: "#11181C"
                        }
                    }
                },
                dark: {
                    colors: {
                        secondary: {
                            foreground: "#363636",
                            DEFAULT: "#FAFAFA"
                        }
                    }
                }
            }
        }),
        function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    "bg-grid": (value) => ({
                        backgroundImage: `url("${svgToDataUri(
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
                        )}")`
                    }),
                    "bg-grid-small": (value) => ({
                        backgroundImage: `url("${svgToDataUri(
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
                        )}")`
                    }),
                    "bg-dot": (value) => ({
                        backgroundImage: `url("${svgToDataUri(
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
                        )}")`
                    })
                },
                { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
            )
        }
    ]
}

function addVariablesForColors({ addBase, theme }) {
    let allColors = flattenColorPalette(theme("colors"))
    let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    )

    addBase({
        ":root": newVars
    })
}
