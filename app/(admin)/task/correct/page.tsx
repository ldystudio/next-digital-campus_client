import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "作业批改"
}

export default function TaskCorrectPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
