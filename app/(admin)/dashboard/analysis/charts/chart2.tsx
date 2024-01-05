"use client"

import { ChartCard } from "@/components/business"

export default function Chart2({ className }: { className?: string }) {
    const chartCardProps = {
        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yData: Array.from({ length: 7 }, () =>
            Math.round(Math.random() * (130 - 80) + 80)
        ),
        color: "#ae7ede",
        imgPath: "/images/icon/004-fire.jpg",
        title: "教师出勤率统计",
        describe: "Teacher attendance statistics",
        number: 75,
        floating: "+2.1%",
        subDescribe: "出勤人数",
        className
    }
    return <ChartCard {...chartCardProps} />
}
