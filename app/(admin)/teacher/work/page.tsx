import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "工作安排"
}

export default function TeacherWorkPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
