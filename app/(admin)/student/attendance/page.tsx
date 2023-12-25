import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "考勤管理"
}

export default function StudentAttendancePage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
