import { button as buttonStyles } from "@nextui-org/react"

import { Link } from "@/components/common"
import { title } from "@/components/custom"

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
