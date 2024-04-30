import type { Metadata } from "next"
import { Card } from "@nextui-org/react"

import BarChartCard from "./components/bar-chart-card"
import { DataProvider } from "./components/data-provider"
import DescribeCard from "./components/describe-card"
import PieChartCard from "./components/pie-chart-card"

export const metadata: Metadata = {
    title: "成绩统计"
}

export default function ScoreStatisticsPage() {
    return (
        <section className='grid grid-flow-row-dense grid-cols-1 gap-3 *:rounded-3xl lg:multi-["h-full;grid-cols-5;grid-rows-8;gap-5"] xl:grid-cols-7'>
            <DataProvider>
                <DescribeCard className='order-1 grow lg:multi-["col-span-2;row-span-4"]' />
                <PieChartCard className='order-2 min-h-72 grow lg:multi-["col-span-3;row-span-5"]' />
                <Card className='order-3 grow lg:multi-["col-span-2;row-span-4;hidden"] xl:flex'>
                    3
                </Card>
                <Card className='order-4 grow lg:multi-["col-span-2;row-span-4"]'>
                    4
                </Card>
                <BarChartCard className='order-5 grow lg:multi-["col-span-3;row-span-3"]' />
                <Card className='order-6 grow lg:multi-["col-span-2;row-span-4;hidden"] xl:flex'>
                    6
                </Card>
            </DataProvider>
        </section>
    )
}
