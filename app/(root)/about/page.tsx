import type { Metadata } from "next"
import { button as buttonStyles } from "@nextui-org/react"

import { Link } from "@/components/common/link"
import { title } from "@/components/custom"

export const metadata: Metadata = {
    title: "关于"
}

export default function AboutPage() {
    return (
        <div>
            <h1 className={title()}>About</h1>
            <Link
                href='/'
                className={buttonStyles({
                    color: "primary",
                    radius: "full",
                    variant: "shadow"
                })}
            >
                首页
            </Link>
        </div>
    )
}
