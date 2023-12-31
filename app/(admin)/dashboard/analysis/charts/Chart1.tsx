"use client"

import { ChartCard } from "@/components/business"

export default function Chart1({ className }: { className?: string }) {
    const chartCardProps = {
        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yData: Array.from({ length: 7 }, () =>
            Math.round(Math.random() * (130 - 80) + 80)
        ),
        color: "#66aaf9",
        imgPath: "/images/icon/004-fire.jpg",
        title: "学生签到率统计",
        describe: "Student attendance statistics",
        number: 58745,
        floating: "+4.5%",
        subDescribe: "签到人数",
        className
    }
    return <ChartCard {...chartCardProps} />
}
