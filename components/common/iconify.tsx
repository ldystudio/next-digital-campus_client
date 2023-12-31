"use client"

import { Icon, IconProps } from "@iconify/react"
import { BaseColors, ThemeColors } from "@nextui-org/react"

interface IconifyProps extends Omit<IconProps, "color"> {
    color?: keyof Omit<ThemeColors, keyof BaseColors> | "light"
    height?: string | number
    otherProps?: IconProps
}

export function Iconify({
    color = "default",
    height = "auto",
    ...otherProps
}: IconifyProps) {
    const colorMap = {
        primary: "#006FEE",
        secondary: "#11181C",
        success: "#17c964",
        warning: "#f5a524",
        danger: "#f31260",
        light: "#FAFAFA",
        default: "#18181b"
    }

    return <Icon color={colorMap[color]} height={height} {...otherProps} />
}
