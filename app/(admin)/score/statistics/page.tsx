import type { Metadata } from "next"
import { Card } from "@nextui-org/react"

export const metadata: Metadata = {
    title: "成绩统计"
}

export default function ScoreStatisticsPage() {
    return (
        <section className='grid grid-flow-row-dense grid-cols-1 gap-3 *:rounded-3xl lg:multi-["h-full;grid-cols-7;grid-rows-8;gap-5"]'>
            <Card className='order-1 grow lg:multi-["col-span-2;row-span-4"]'>1</Card>
            <Card className='order-2 grow lg:multi-["col-span-3;row-span-5"]'>2</Card>
            <Card className='order-3 grow lg:multi-["col-span-2;row-span-4"]'>3</Card>
            <Card className='order-4 grow lg:multi-["col-span-2;row-span-4"]'>4</Card>
            <Card className='order-5 grow lg:multi-["col-span-3;row-span-3"]'>5</Card>
            <Card className='order-6 grow lg:multi-["col-span-2;row-span-4"]'>5</Card>
        </section>
    )
}
