"use client"

import {
    OverlayScrollbarsComponent,
    OverlayScrollbarsComponentProps
} from "overlayscrollbars-react"

import "overlayscrollbars/overlayscrollbars.css"

interface ScrollbarProps {
    className?: string
    children: React.ReactNode
    scrollbarProps?: OverlayScrollbarsComponentProps
}

export default function Scrollbar({
    className,
    children,
    scrollbarProps
}: ScrollbarProps) {
    return (
        <OverlayScrollbarsComponent
            defer
            options={{
                scrollbars: { autoHide: "scroll", autoHideDelay: 500 }
            }}
            className={className}
            {...scrollbarProps}
        >
            {children}
        </OverlayScrollbarsComponent>
    )
}
