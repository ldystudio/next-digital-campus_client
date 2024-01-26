import type { Metadata } from "next"

import Chart1 from "./charts/chart1"
import Chart2 from "./charts/chart2"
import Chart3 from "./charts/chart3"
import LargeChart from "./charts/large-chart"
import SummaryCard from "./charts/summary-card"

export const metadata: Metadata = {
    title: "分析页"
}

export default function DashboardAnalysisPage() {
    return (
        <section className='grid grid-flow-row-dense grid-cols-1 gap-3 *:rounded-3xl lg:h-full lg:grid-cols-8 lg:grid-rows-8 lg:gap-5'>
            <Chart1 className='order-1 lg:col-span-3 lg:row-span-3' />
            <Chart2 className='order-2 lg:col-span-3 lg:row-span-3' />
            <SummaryCard className='order-4 lg:order-3 lg:col-span-2 lg:row-span-4' />
            <LargeChart className='order-3 lg:order-4 lg:col-span-6 lg:row-span-5' />
            <Chart3 className='order-5 lg:col-span-2 lg:row-span-4' />
        </section>
    )
}
