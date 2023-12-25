import type { Metadata } from "next"

import { PageUnderConstruction } from "@/components/custom"

export const metadata: Metadata = {
    title: "班级相册"
}

export default function ClassPhotoPage() {
    return <PageUnderConstruction pageTitle={metadata.title?.toString()} />
}
