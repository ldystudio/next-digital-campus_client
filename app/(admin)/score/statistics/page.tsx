import type { Metadata } from "next"

import BarChartCard from "./components/bar-chart-card"
import { DataProvider } from "./components/data-provider"
import DescribeCard from "./components/describe-card"
import PieChartCard from "./components/pie-chart-card"
import RadarChartCard from "./components/radar-chart-card"
import RankingCard from "./components/ranking-card"
import WordCloudCard from "./components/word-cloud-card"

export const metadata: Metadata = {
    title: "成绩统计"
}

export default function ScoreStatisticsPage() {
    return (
        <section className='grid grid-flow-row-dense grid-cols-1 gap-3 *:rounded-3xl lg:multi-["h-full;grid-cols-5;grid-rows-8;gap-5"] xl:grid-cols-7'>
            <DataProvider>
                <DescribeCard className='order-1 grow lg:multi-["col-span-2;row-span-4"]' />
                <PieChartCard className='order-2 min-h-72 grow lg:multi-["col-span-3;row-span-5"]' />
                <RankingCard className='order-3 grow lg:multi-["col-span-2;row-span-4;hidden"] xl:flex' />
                <RadarChartCard className='order-4 min-h-72 grow lg:multi-["col-span-2;row-span-4"]' />
                <BarChartCard className='order-5 min-h-[360px] grow lg:multi-["col-span-3;row-span-3;min-h-0"]' />
                <WordCloudCard className='order-6 min-h-72 grow lg:multi-["col-span-2;row-span-4;hidden"] xl:flex' />
            </DataProvider>
        </section>
    )
}
