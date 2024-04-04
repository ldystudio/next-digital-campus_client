import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "设置"
}

export default function SettingPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
