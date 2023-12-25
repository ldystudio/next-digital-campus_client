import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "教学资源上传"
}

export default function ResourceUploadPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
