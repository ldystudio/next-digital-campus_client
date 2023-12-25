import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "考试成绩管理"
}

export default function ExamScorePage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
