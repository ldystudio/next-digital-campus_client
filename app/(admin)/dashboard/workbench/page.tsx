import type { Metadata } from "next"

import BannerCard from "./components/banner-card"
import CalendarCard from "./components/calendar-card"
import GoalCard from "./components/goal-card"
import ProgressCard from "./components/progress-card"
import VideoCard from "./components/video-card"

export const metadata: Metadata = {
    title: "工作台"
}

export default function DashboardWorkbenchPage() {
    return (
        <section className='grid grid-flow-row-dense grid-cols-1 gap-3 *:rounded-3xl lg:h-full lg:grid-cols-8 lg:grid-rows-8 lg:gap-5'>
            <BannerCard className='order-1 bg-primary lg:col-span-6 lg:row-span-2' />
            <CalendarCard className='order-2 lg:col-span-2 lg:row-span-8' />
            <GoalCard className='order-3 lg:col-span-4 lg:row-span-4' />
            <ProgressCard className='order-4 lg:col-span-2 lg:row-span-4' />
            <VideoCard className='order-5 lg:col-span-6 lg:row-span-2' />
        </section>
    )
}
