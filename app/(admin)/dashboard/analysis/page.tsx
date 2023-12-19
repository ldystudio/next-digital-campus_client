import type { Metadata } from "next"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "default-no-store"

export const metadata: Metadata = {
    title: "分析页"
}

export default function AnalysisPage() {
    return <div>AnalysisPage</div>
}
