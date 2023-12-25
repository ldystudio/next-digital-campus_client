import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "作业布置"
}

export default function TaskAddPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
