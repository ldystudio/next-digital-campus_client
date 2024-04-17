import type { Metadata } from "next"

import Chart1 from "./components/chart1"
import Chart2 from "./components/chart2"
import Chart3 from "./components/chart3"
import LargeChart from "./components/large-chart"
import SummaryCard from "./components/summary-card"

export const metadata: Metadata = {
    title: "分析页"
}

export default function DashboardAnalysisPage() {
    return (
        <section className='grid grid-flow-row-dense grid-cols-1 gap-3 *:rounded-3xl lg:h-full lg:grid-cols-6 lg:grid-rows-8 lg:gap-5 xl:grid-cols-8'>
            <Chart1 className='order-1 grow lg:col-span-3 lg:row-span-3' />
            <Chart2 className='order-2 grow lg:col-span-3 lg:row-span-3' />
            <SummaryCard className='order-4 grow lg:hidden xl:order-3 xl:col-span-2 xl:row-span-4 xl:grid' />
            <LargeChart className='order-3 grow lg:order-4 lg:col-span-6 lg:row-span-5' />
            <Chart3 className='order-5 grow lg:hidden xl:col-span-2 xl:row-span-4 xl:flex' />
        </section>
    )
}
