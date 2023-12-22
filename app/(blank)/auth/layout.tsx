import clsx from "clsx"

import { PageTransitionEffect } from "@/components/layout"
import { NotoSansSC } from "~/config"

export default function AuthLayout({ children }: LayoutProps) {
    return (
        <main>
            <section
                className={clsx(
                    "h-screen w-full overflow-x-hidden bg-background bg-cover bg-center md:bg-blob-scene",
                    NotoSansSC.className
                )}
            >
                <PageTransitionEffect className='flex h-full items-center justify-center'>
                    {children}
                </PageTransitionEffect>
            </section>
        </main>
    )
}
