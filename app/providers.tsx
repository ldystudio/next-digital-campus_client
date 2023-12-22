"use client"
import { useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
import { useRouter } from "next/navigation"

import { Provider as ReduxProvider } from "react-redux"
import { NextUIProvider } from "@nextui-org/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import store from "~/store"

export interface ProvidersProps {
    children: React.ReactNode
    themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
    const router = useRouter()
    const [queryClient] = useState(
        () => new QueryClient({ defaultOptions: { queries: { staleTime: 5 * 1000 } } })
    )

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
