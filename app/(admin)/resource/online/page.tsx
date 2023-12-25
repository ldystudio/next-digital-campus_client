import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "在线文档管理"
}

export default function ResourceOnlinePage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
