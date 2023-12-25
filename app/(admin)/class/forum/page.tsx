import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "班级论坛"
}

export default function ClassForumPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
