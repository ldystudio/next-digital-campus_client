import type { Metadata } from "next"

import { Col } from "@/components/common"

export const metadata: Metadata = {
    title: "分析页"
}

export default function AnalysisPage() {
    return (
        <Col className='mt-[35vh]'>
            <p>AnalysisPage</p>
            <p>AnalysisPage</p>
            <p>AnalysisPage</p>
            <p>AnalysisPage</p>
        </Col>
    )
}
