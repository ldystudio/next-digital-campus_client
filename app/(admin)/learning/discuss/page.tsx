import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "在线讨论"
}

export default function LearningDiscussPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
