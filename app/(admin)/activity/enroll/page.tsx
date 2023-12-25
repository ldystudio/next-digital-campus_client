import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "活动报名"
}

export default function ActivityEnrollPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
