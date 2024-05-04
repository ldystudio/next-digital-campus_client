import { ClassValue, clsx } from "clsx"
import { createTwc } from "react-twc"
import { extendTailwindMerge } from "tailwind-merge"

const COMMON_UNITS = ["small", "medium", "large"]

const twMerge = extendTailwindMerge({
    extend: {
        theme: {
            opacity: ["disabled"],
            spacing: ["divider"],
            borderWidth: COMMON_UNITS,
            borderRadius: COMMON_UNITS
        },
        classGroups: {
            shadow: [{ shadow: COMMON_UNITS }],
            "font-size": [{ text: ["tiny", ...COMMON_UNITS] }],
            "bg-image": ["bg-stripe-gradient"]
        }
    }
})

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const twx = createTwc({ compose: cn })
