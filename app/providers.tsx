"use client"

import { useRouter } from "next/navigation"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
import { Provider as ReduxProvider } from "react-redux"
import { NextUIProvider } from "@nextui-org/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import store from "~/store"

export interface ProvidersProps {
    children: React.ReactNode
    themeProps?: ThemeProviderProps
}

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // 数据过期时间
                staleTime: 60 * 1000
            }
        }
    })
}

let browserQueryClient = typeof window === "undefined" ? undefined : makeQueryClient()

function getQueryClient() {
    return (browserQueryClient ??= makeQueryClient())
}

export function Providers({ children, themeProps }: ProvidersProps) {
    const router = useRouter()
    const queryClient = getQueryClient()

    return (
        <NextUIProvider navigate={router.push}>
            <NextThemesProvider {...themeProps}>
                <QueryClientProvider client={queryClient}>
                    <ReduxProvider store={store}>{children}</ReduxProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </NextThemesProvider>
        </NextUIProvider>
    )
}
