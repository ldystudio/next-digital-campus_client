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
        <section className='grid grid-flow-row-dense grid-cols-1 gap-3 *:rounded-3xl lg:h-full lg:grid-cols-6 lg:grid-rows-8 lg:gap-5 xl:grid-cols-8'>
            <BannerCard className='order-1 grow bg-primary-400 lg:col-span-3 lg:row-span-4' />
            <WelcomeCard className='order-2 grow lg:col-span-3 lg:row-span-4' />
            <CalendarCard className='order-3 grow lg:col-span-2 lg:row-span-8 lg:hidden xl:flex' />
            <GoalCard className='order-4 grow lg:col-span-4 lg:row-span-4' />
            <ProgressCard className='order-5 grow lg:col-span-2 lg:row-span-4' />
        </section>
    )
}
