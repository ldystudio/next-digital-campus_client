import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "个人消息通知"
}

export default function NoticePersonPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
