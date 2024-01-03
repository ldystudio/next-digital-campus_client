import clsx from "clsx"

import { Content, Expand, Side } from "@/components/layout"
import { NotoSansSC } from "~/config"

export default function AdminLayout({ children }: LayoutProps) {
    return (
        <main>
            <div className={clsx("flex h-screen min-h-[650px]", NotoSansSC.className)}>
                <Side />
                <Content>{children}</Content>
            </div>
            <Expand />
        </main>
    )
}
