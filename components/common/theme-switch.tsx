"use client"

import { useTheme } from "next-themes"
import { Spinner } from "@nextui-org/react"
import { Expand } from "@theme-toggles/react"

import "@theme-toggles/react/css/Expand.css"

import { useClientServerCheck } from "~/hooks/common"
import { cn } from "~/utils"

/**
 * Switches the theme between light and dark.
 *
 * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} event - The mouse event that triggered the switch.
 * @return {void} No return value.
 */
export function ThemeSwitch({ className }: { className?: string }) {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const { isServer } = useClientServerCheck()

    if (isServer) {
        return <Spinner size='sm' color='secondary' className={cn(className)} />
    }

    // Handle the switch event
    function handleSwitch(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        const x = event.clientX
        const y = event.clientY
        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        )
        // Check if Transition API is supported
        // If not, directly update the theme
        // @ts-expect-error: Transition API
        if (!document.startViewTransition) {
            setTheme(theme === "light" ? "dark" : "light")
            return
        }
        // Start the view transition
        // @ts-expect-error: Transition API
        const transition = document.startViewTransition(() => {
            setTheme(theme === "light" ? "dark" : "light")
        })
        // After the transition is ready, animate the clipPath
        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`
            ]
            document.documentElement.animate(
                {
                    clipPath: theme === "light" ? clipPath : [...clipPath].reverse()
                },
                {
                    duration: 500,
                    easing: "ease-in",
                    fill: "forwards",
                    pseudoElement:
                        theme === "light"
                            ? "::view-transition-new(root)"
                            : "::view-transition-old(root)"
                }
            )
        })
    }
    return (
        // Render the theme switch button
        <div
            className={cn("flex cursor-pointer items-center justify-center", className)}
            onClick={(e) => handleSwitch(e)}
        >
            <Expand duration={750} toggled={resolvedTheme === "light"} />
        </div>
    )
}
