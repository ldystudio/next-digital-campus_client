import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "成绩查询"
}

export default function ScoreQueryPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
