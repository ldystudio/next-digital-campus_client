import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "班级通知"
}

export default function NoticeClassPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
