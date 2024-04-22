import type { Metadata } from "next"

import BannerCard from "./components/banner-card"
import CalendarCard from "./components/calendar-card"
import GoalCard from "./components/goal-card"
import ProgressCard from "./components/progress-card"
import WelcomeCard from "./components/welcome-card"

export const metadata: Metadata = {
    title: "工作台"
}

export default function DashboardWorkbenchPage() {
    return (
        <section className='grid grid-flow-row-dense grid-cols-1 gap-3 *:rounded-3xl lg:multi-["h-full;grid-cols-6;grid-rows-8;gap-5"] xl:grid-cols-8'>
            <BannerCard className='order-1 grow bg-primary-400 lg:multi-["col-span-3;row-span-4"]' />
            <WelcomeCard className='order-2 grow lg:multi-["col-span-3;row-span-4"]' />
            <CalendarCard className='order-3 grow lg:multi-["col-span-2;row-span-8;hidden"] xl:flex' />
            <GoalCard className='order-4 grow lg:multi-["col-span-4;row-span-4"]' />
            <ProgressCard className='order-5 grow lg:multi-["col-span-2;row-span-4"]' />
        </section>
    )
}
