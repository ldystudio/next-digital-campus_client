"use client"

import { OverlayScrollbarsComponent } from "overlayscrollbars-react"

import { Col } from "@/components/common"
import { cn } from "~/utils"

import "overlayscrollbars/overlayscrollbars.css"

export default function OverlayScrollbar({ children, className }: LayoutProps) {
    return (
        <OverlayScrollbarsComponent
            defer
            className='h-screen'
            options={{ scrollbars: { autoHide: "scroll", autoHideDelay: 500 } }}
        >
            <Col className={cn("grow", className)}>{children}</Col>
        </OverlayScrollbarsComponent>
    )
}
