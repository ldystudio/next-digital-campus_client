"use client"

import { Icon, IconProps } from "@iconify/react"
import { Skeleton } from "@nextui-org/react"

import { useClientServerCheck } from "~/hooks/common"

export function Iconify({ height, ...otherProps }: IconProps) {
    const size = height ? `${height}px` : "auto"
    const { isServer } = useClientServerCheck()
    if (isServer) {
        return <Skeleton className={`rounded-full`} style={{ height: size, width: size }} />
    }
    return <Icon height={height || "auto"} {...otherProps} />
}
