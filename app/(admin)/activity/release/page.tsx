import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "活动发布"
}

export default function ActivityReleasePage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
