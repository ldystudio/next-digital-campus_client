import { nextui } from "@nextui-org/react";

import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
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
};
