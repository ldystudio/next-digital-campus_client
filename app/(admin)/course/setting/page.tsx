import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "课程设置"
}

export default function CourseSettingPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
