import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "活动成果展示"
}

export default function ActivityAchievementPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
