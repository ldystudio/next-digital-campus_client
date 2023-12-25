import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "选课管理"
}

export default function CourseChoosePage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
