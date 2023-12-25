import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "信息管理"
}

export default function StudentInformationPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
