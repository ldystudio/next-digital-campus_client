import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "班级成员管理"
}

export default function ClassMemberPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
