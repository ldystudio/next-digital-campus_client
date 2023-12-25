import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "考勤管理"
}

export default function TeacherAttendancePage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
