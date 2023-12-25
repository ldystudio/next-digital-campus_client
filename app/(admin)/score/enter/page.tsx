import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "成绩录入"
}

export default function ScoreEnterPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
