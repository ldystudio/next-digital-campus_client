import dynamic from "next/dynamic"

import clsx from "clsx"

import { Col, Link } from "@/components/common"
import { PageTransitionEffect } from "@/components/layout"
import { Navbar } from "@/components/layout"
import config from "@/package.json"
import { JosefinSans } from "~/config"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
    ssr: false,
})

export default function RootLayout({ children }: LayoutProps) {
    return (
        <Col className='h-screen'>
            {/* <AnimatedCursor
				innerSize={15}
				outerSize={30}
				color='0, 111, 238'
				outerAlpha={0.2}
				innerScale={0.6}
				outerScale={1.5}
				trailingSpeed={4}
			/> */}
            <Navbar />
            <main className='container mx-auto max-w-7xl px-6 flex-grow overflow-x-hidden'>
                <PageTransitionEffect>{children}</PageTransitionEffect>
            </main>
            <footer
                className={clsx(
                    "w-full flex flex-col lg:flex-row items-center justify-around py-3 bg-default-100 text-default-600",
                    JosefinSans.className
                )}
            >
                <p>@ 2023 Next Digital Campus.</p>
                <Link
                    isExternal
                    className='flex items-center gap-1 text-current'
                    href='https://github.com/ldystudio'
                >
                    <span>Powered by</span>
                    <p className='text-primary'>Liudy</p>
                </Link>
                <p>v{config.version} All rights reserved</p>
            </footer>
        </Col>
    )
}
