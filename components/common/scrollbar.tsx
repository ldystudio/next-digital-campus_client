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

export default function Scrollbar({ children, ...scrollbarProps }: ScrollbarProps) {
    return (
        <OverlayScrollbarsComponent
            defer
            options={{
                scrollbars: { autoHide: "scroll", autoHideDelay: 500 }
            }}
            {...scrollbarProps}
        >
            {children}
        </OverlayScrollbarsComponent>
    )
}
