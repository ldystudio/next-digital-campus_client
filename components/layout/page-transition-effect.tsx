"use client"

import { useContext, useRef } from "react"
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { usePathname } from "next/navigation"

import { AnimatePresence, motion, Variants } from "framer-motion"

import { cn } from "~/utils"

interface PageTransitionEffectProps {
    children: React.ReactNode
    className?: string
    variants?: {
        initial: Variants["initial"]
        animate: Variants["animate"]
        exit?: Variants["exit"]
    }
}

function FrozenRouter({ children }: LayoutProps) {
    const context = useContext(LayoutRouterContext ?? {})
    const frozen = useRef(context).current

    if (!frozen) {
        return <>{children}</>
    }

    return (
        <LayoutRouterContext.Provider value={frozen}>
            {children}
        </LayoutRouterContext.Provider>
    )
}

export function PageTransitionEffect({
    children,
    className,
    variants
}: PageTransitionEffectProps) {
    const pathname = usePathname()

    const defaultVariants: Variants = {
        initial: {
            opacity: 0,
            translateX: "-50%"
        },
        animate: {
            opacity: 1,
            translateX: "0%"
        },
        exit: {
            opacity: 0,
            translateX: "50%"
        }
    }

    return (
        <AnimatePresence mode='wait'>
            <motion.div
                key={pathname}
                layout
                variants={variants || defaultVariants}
                initial='initial'
                animate='animate'
                exit='exit'
                transition={{ type: "tween", duration: 0.5 }}
                className={cn("transform-gpu", className)}
            >
                <FrozenRouter>{children}</FrozenRouter>
            </motion.div>
        </AnimatePresence>
    )
}
