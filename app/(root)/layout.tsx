import dynamic from "next/dynamic"

import clsx from "clsx"

import { Col, Link } from "@/components/common"
import { PageSwitchingAnimation } from "@/components/layout"
import { Navbar } from "@/components/layout"
import { JosefinSans } from "~/config"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
    ssr: false
})

export default function RootLayout({ children }: LayoutProps) {
    return (
        <Col className='relative'>
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
            <main className='container mx-auto max-w-7xl px-6 flex-grow'>
                <PageSwitchingAnimation>{children}</PageSwitchingAnimation>
            </main>
            <footer
                className={clsx(
                    "w-full flex items-center justify-center py-3",
                    JosefinSans.className
                )}
            >
                <Link
                    isExternal
                    className='flex items-center gap-1 text-current'
                    // @ts-expect-error: 链接不在AuthRoute.RoutePath中
                    href='https://nextui-docs-v2.vercel.app?utm_source=next-app-template'
                    title='nextui.org homepage'
                >
                    <span className='text-default-600'>Powered by</span>
                    <p className='text-primary'>NextUI</p>
                </Link>
            </footer>
        </Col>
    )
}
