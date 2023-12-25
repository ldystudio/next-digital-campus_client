import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "成绩统计"
}

export default function ScoreStatisticsPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
