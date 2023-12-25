import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "学习资源分享"
}

export default function LearningSharePage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
