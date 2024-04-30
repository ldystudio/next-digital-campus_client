"use client"

import { useTheme } from "next-themes"
import { Icon, IconProps } from "@iconify/react"

import { colorMap } from "~/config"

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

    return (
        <Icon
            color={
                color
                    ? colorMap[color]
                    : theme === "dark"
                      ? colorMap.light
                      : colorMap.dark
            }
            height={height}
            {...otherProps}
        />
    )
}
