import clsx from "clsx"

import { Col, Link } from "@/components/common"
import { Navbar, PageTransitionEffect } from "@/components/layout"
import config from "@/package.json"
import { JosefinSans } from "~/config"

export default function RootLayout({ children }: LayoutProps) {
    return (
        <Col className='min-h-screen'>
            <Navbar />
            <main className='container max-w-7xl grow overflow-x-hidden px-6'>
                <PageTransitionEffect>{children}</PageTransitionEffect>
            </main>
            <footer
                className={clsx(
                    "mt-2 flex w-full flex-col items-center justify-around bg-default-100 py-3 text-default-600 lg:flex-row",
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
