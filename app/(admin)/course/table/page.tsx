import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "课程表管理"
}

export default function CourseTablePage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
