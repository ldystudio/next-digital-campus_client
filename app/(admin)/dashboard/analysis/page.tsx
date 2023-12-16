import type { Metadata } from "next"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "default-no-store"

export const metadata: Metadata = {
    title: "My Site",
    description: "This is my site."
}

export default function AnalysisPage() {
    return <div>AnalysisPage</div>
}
