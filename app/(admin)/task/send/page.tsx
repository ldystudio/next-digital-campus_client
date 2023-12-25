import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "作业提交"
}

export default function TaskSendPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
