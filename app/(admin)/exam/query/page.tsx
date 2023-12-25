import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "考试查询"
}

export default function ExamQueryPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
