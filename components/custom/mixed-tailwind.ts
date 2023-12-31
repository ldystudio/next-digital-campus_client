import { tv } from "tailwind-variants"

export const title = tv({
    base: "tracking-tight font-semibold leading-tight",
    variants: {
        color: {
            violet: "from-[#FF1CF7] to-[#b249f8]",
            yellow: "from-[#FF705B] to-[#FFB457]",
            blue: "from-[#5EA2EF] to-[#0072F5]",
            cyan: "from-[#00b7fa] to-[#01cfea]",
            green: "from-[#6FEE8D] to-[#17c964]",
            pink: "from-[#FF72E1] to-[#F54C7A]",
            foreground:
                "from-[#11181C] to-[#4B4B4B] dark:from-[#FFFFFF] dark:to-[#4B4B4B]"
        },
        size: {
            xxs: "text-2xl",
            xs: "text-3xl lg:text-4xl",
            sm: "text-4xl lg:text-5xl",
            md: "text-5xl",
            lg: "text-6xl"
        },
        fullWidth: {
            true: "block w-full"
        }
    },
    defaultVariants: {
        size: "sm"
    },
    compoundVariants: [
        {
            color: ["violet", "yellow", "blue", "cyan", "green", "pink", "foreground"],
            class: "bg-gradient-to-b bg-clip-text text-transparent"
        }
    ]
})

export const subtitle = tv({
    base: "text-md my-2 block w-full max-w-full font-bold text-default-600 md:w-1/2 lg:text-xl",
    variants: {
        fullWidth: {
            true: "!w-full"
        }
    },
    defaultVariants: {
        fullWidth: true
    }
})
