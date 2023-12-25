import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "学校通知"
}

export default function NoticeSchoolPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
