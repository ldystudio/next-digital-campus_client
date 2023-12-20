import clsx from "clsx"

import { PageTransitionEffect } from "@/components/layout"
import { NotoSansSC } from "~/config"

export default function AuthLayout({ children }: LayoutProps) {
    return (
        <main>
            <section
                className={clsx(
                    "w-full h-screen bg-background bg-cover bg-center md:bg-blob-scene overflow-x-hidden",
                    NotoSansSC.className
                )}
            >
                <PageTransitionEffect className='h-full flex items-center justify-center'>
                    {children}
                </PageTransitionEffect>
            </section>
        </main>
    )
}
