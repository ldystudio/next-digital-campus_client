import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "学籍管理"
}

export default function StudentRollPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
