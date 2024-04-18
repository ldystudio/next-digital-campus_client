const { fontFamily } = require("tailwindcss/defaultTheme")
const { nextui } = require("@nextui-org/theme")

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
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out"
            }
        }
    },
    darkMode: "class",
    plugins: [
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
        })
    ]
}
