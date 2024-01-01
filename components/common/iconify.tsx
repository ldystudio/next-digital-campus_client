"use client"

import { useTheme } from "next-themes"
import { Icon, IconProps } from "@iconify/react"

interface IconifyProps extends Omit<IconProps, "color"> {
    color?:
        | "primary"
        | "secondary"
        | "success"
        | "warning"
        | "danger"
        | "light"
        | "dark"
    height?: string | number
    otherProps?: IconProps
}

export function Iconify({ color, height = "auto", ...otherProps }: IconifyProps) {
    const { theme } = useTheme()
    const colorMap = {
        primary: "#006FEE",
        secondary: "#11181C",
        success: "#17c964",
        warning: "#f5a524",
        danger: "#f31260",
        light: "#FAFAFA",
        dark: "#18181b"
    }

    return (
        <Icon
            color={
                color
                    ? colorMap[color]
                    : theme === "light"
                      ? colorMap.dark
                      : colorMap.light
            }
            height={height}
            {...otherProps}
        />
    )
}
