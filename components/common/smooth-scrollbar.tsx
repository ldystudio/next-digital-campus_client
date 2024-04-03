"use client"

import { useEffect, useRef } from "react"

import Scrollbar from "smooth-scrollbar"
import { Icon } from "@iconify/react"
import { Spinner } from "@nextui-org/react"

import { Col } from "@/components/common"
import { useClientServerCheck } from "~/hooks/common"
import { cn } from "~/utils"
import EdgeEasingPlugin from "~/utils/plugin/edge-easing-plugin"
import ScaleSpeedPlugin from "~/utils/plugin/scale-speed-plugin"

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    typeof navigator === "undefined" ? "" : navigator.userAgent
)

export default function SmoothScrollbar({ children, className }: LayoutProps) {
    const ref = useRef<HTMLDivElement>(null)
    const topRef = useRef<HTMLDivElement>(null)
    const { isServer } = useClientServerCheck()

    useEffect(() => {
        if (isMobile) return

        Scrollbar.use(ScaleSpeedPlugin, EdgeEasingPlugin)
        const scrollbar = Scrollbar.init(ref.current as HTMLElement, {
            damping: 0.1,
            plugins: { scaleSpeed: { speed: 0.6 } }
        })

        return () => scrollbar.destroy()
    }, [])

    const backToTop = () => {
        if (isMobile) {
            topRef.current?.scrollIntoView({ behavior: "smooth" })
        } else {
            const scrollbar = Scrollbar.get(ref.current as HTMLElement)
            scrollbar?.scrollTo(0, 0, 600)
        }
    }

    return (
        <>
            <div ref={ref} className='h-screen'>
                <div ref={topRef} />
                <Col className={cn("min-h-screen grow", className)}>{children}</Col>
            </div>
            {/* fixed elements must be placed outside the data-scrollbar */}
            <a
                onClick={backToTop}
                className='fixed bottom-8 right-8 flex cursor-pointer items-center justify-center rounded-full bg-primary p-2 text-2xl text-white'
            >
                {isServer ? (
                    <Spinner
                        color='white'
                        classNames={{
                            wrapper: "flex items-center justify-center",
                            circle1: "h-6 w-6",
                            circle2: "h-6 w-6"
                        }}
                    />
                ) : (
                    <Icon icon='solar:arrow-to-top-left-bold-duotone' height='auto' />
                )}
            </a>
        </>
    )
}
