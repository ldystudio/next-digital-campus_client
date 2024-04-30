"use client"

import NextImage, { ImageProps as NextImageProps } from "next/image"

import { useResponsive } from "ahooks"
import { useTheme } from "next-themes"
import { Image as NextUiImage, ImageProps as NextUiImageProps } from "@nextui-org/react"

import { cn } from "~/utils"
import { isNumber } from "~/utils/common"

type NextImagePropsMixin = Omit<NextImageProps, "src" | "width"> &
    Omit<NextUiImageProps, "src" | "width">

interface ImageProps extends NextImagePropsMixin {
    src: `/images/${string}`
    // 统一宽度 | 在电脑上的宽度、在手机上的宽度
    width: number | [number, number]
    // 图片原始尺寸，用于保持比例
    originalSize: {
        width: number
        height: number
    }
    noInvert?: boolean
}

export function LocalImage({
    src,
    width,
    originalSize,
    noInvert,
    className,
    ...otherProps
}: ImageProps) {
    const responsive = useResponsive()
    const { theme } = useTheme()

    width = isNumber(width) ? [width, width] : width
    const imgWidth = responsive?.md ? width[0] : width[1]
    const imgHeight = Math.round((imgWidth * originalSize.height) / originalSize.width)

    return (
        <NextUiImage
            as={NextImage}
            src={src}
            width={imgWidth}
            height={imgHeight}
            draggable='false'
            isBlurred
            className={cn(
                !noInvert && theme === "dark" && "hue-rotate-180 invert",
                "select-none animate-in zoom-in",
                className
            )}
            {...otherProps}
        />
    )
}
