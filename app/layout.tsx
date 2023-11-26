import { Metadata, Viewport } from "next";

import clsx from "clsx";
import { Toaster as Notice } from "react-hot-toast";

import { Toaster } from "@/components/ui/toaster";
import { fontSans } from "~/config/fonts";
import { Providers } from "./providers";

import "~/styles/globals.css";

export const metadata: Metadata = {
	title: {
		default: process.env.APP_TITLE || "环境变量APP_TITLE未设置",
		template: `%s - ${process.env.APP_TITLE}`
	},
	description: process.env.APP_DESC,
	icons: {
		icon: "/favicon.ico"
		// shortcut: "/favicon-16x16.png",
		// apple: "/apple-touch-icon.png"
	},
	other: {
		"format-detection": "telephone=no, date=no, email=no, address=no"
	}
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" }
	]
};

export default function Layout({ children }: LayoutProps) {
	return (
		<html lang='zh-CN' suppressHydrationWarning>
			<head />
			<body
				className={`min-h-screen bg-background font-sans antialiased ${fontSans.variable}`}
			>
				<Providers
					themeProps={{
						attribute: "class",
						defaultTheme: "system",
						enableSystem: true,
						disableTransitionOnChange: true
					}}
				>
					<Notice />
					<main>{children}</main>
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
