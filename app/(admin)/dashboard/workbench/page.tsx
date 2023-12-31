import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "工作台"
}

export default function DashboardWorkbenchPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
