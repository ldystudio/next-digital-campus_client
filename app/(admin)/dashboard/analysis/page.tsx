import type { Metadata } from "next"

import Chart1 from "./charts/Chart1"

export const metadata: Metadata = {
    title: "分析页"
}

export default function DashboardAnalysisPage() {
    return (
        <section className='grid grid-flow-row-dense grid-cols-1 gap-3 *:rounded-3xl lg:h-full lg:grid-cols-8 lg:grid-rows-8 lg:gap-5'>
            <Chart1 className='row-span-3 lg:col-span-3' />
            <Chart1 className='row-span-3 lg:col-span-3'></Chart1>
            <Chart1 className='row-span-4 lg:col-span-2'></Chart1>
            <Chart1 className='row-span-5 lg:col-span-6'></Chart1>
            <Chart1 className='row-span-4 lg:col-span-2'></Chart1>
        </section>
    )
}
