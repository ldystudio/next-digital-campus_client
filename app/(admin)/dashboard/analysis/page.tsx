import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "分析页"
}

export default function DashboardAnalysisPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
