"use client"

import { useRouter } from "next/navigation"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
import { Provider as ReduxProvider } from "react-redux"
import { SWRConfig } from "swr"
import { CalendarDate } from "@internationalized/date"
import { NextUIProvider } from "@nextui-org/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { request } from "~/service/request"
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
        <NextUIProvider
            navigate={router.push}
            locale='zh-CN'
            defaultDates={{
                minDate: new CalendarDate(1980, 1, 1),
                maxDate: new CalendarDate(2099, 12, 31)
            }}
        >
            <NextThemesProvider {...themeProps}>
                <QueryClientProvider client={queryClient}>
                    <ReduxProvider store={store}>
                        <SWRConfig
                            value={{
                                errorRetryCount: 5,
                                fetcher: (url: string) =>
                                    request.get(url).then((res) => res.data),
                                provider: () => new Map()
                            }}
                        >
                            {children}
                        </SWRConfig>
                    </ReduxProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </NextThemesProvider>
        </NextUIProvider>
    )
}
