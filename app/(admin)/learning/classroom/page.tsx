import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "在线课堂"
}

export default function LearningClassroomPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
