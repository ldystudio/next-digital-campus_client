"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
import { useRouter } from "next/navigation"

import { Provider as ReduxProvider } from "react-redux"
import { NextUIProvider } from "@nextui-org/react"

import store from "~/store"

export interface ProvidersProps {
    children: React.ReactNode
    themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
    const router = useRouter()

    return (
        <NextUIProvider navigate={router.push}>
            <NextThemesProvider {...themeProps}>
                <ReduxProvider store={store}>{children}</ReduxProvider>
            </NextThemesProvider>
        </NextUIProvider>
    )
}
