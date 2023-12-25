import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "共享资源管理"
}

export default function ResourceSharePage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
