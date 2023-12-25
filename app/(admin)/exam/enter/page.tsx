import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "考试安排"
}

export default function ExamEnterPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
