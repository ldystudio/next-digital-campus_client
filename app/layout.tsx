import { Metadata, Viewport } from "next"

import NextTopLoader from "nextjs-toploader"
import { Toaster } from "react-hot-toast"
import { Toaster as Notice } from "sonner"

import { siteConfig } from "~/config"
import { fontSans } from "~/config/fonts"
import { Providers } from "./providers"

import "~/styles/globals.css"

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.ico"
        // shortcut: "/favicon-16x16.png",
        // apple: "/apple-touch-icon.png"
    },
    other: {
        "format-detection": "telephone=no, date=no, email=no, address=no"
    }
}

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" }
    ]
}

export default function Layout({ children }: LayoutProps) {
    return (
        <html lang='zh-CN' suppressHydrationWarning>
            <head />
            <body
                className={`min-h-screen min-w-[350px] bg-background font-sans antialiased ${fontSans.variable}`}
            >
                <Providers
                    themeProps={{
                        attribute: "class",
                        defaultTheme: "system",
                        enableSystem: true,
                        disableTransitionOnChange: true
                    }}
                >
                    <NextTopLoader color='#006FEE' zIndex={9999} showSpinner={false} />
                    <Toaster />
                    {children}
                    <Notice richColors position='top-right' duration={3000} />
                </Providers>
            </body>
        </html>
    )
}
