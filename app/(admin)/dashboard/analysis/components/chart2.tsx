"use client"

import * as echarts from "echarts"
import { EChartsOption } from "echarts"

import { ChartCard } from "@/components/business"

export default function Chart2({ className }: PageComponentProps) {
    /** @type EChartsOption */
    const option: EChartsOption = {
        grid: { top: 8, right: 8, bottom: 8, left: 8 },
        xAxis: {
            show: false,
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
            show: false,
            type: "value"
        },
        series: [
            {
                data: Array.from({ length: 7 }, () =>
                    Math.round(Math.random() * (130 - 80) + 80)
                ),
                type: "line",
                smooth: true,
                showSymbol: false,
                lineStyle: { color: "#ae7ede", width: 3 },
                areaStyle: {
                    opacity: 1,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "#ae7ede"
                        },
                        {
                            offset: 1,
                            color: "#ffffff"
                        }
                    ])
                }
            }
        ]
    }

    const chartCardProps = {
        option,
        imgPath: "/images/icon/004-fire.jpg",
        title: "活动参与度统计",
        describe: "Teacher attendance statistics",
        number: 75,
        floating: "+2.1%",
        subDescribe: "出勤人数",
        className
    }

    return <ChartCard {...chartCardProps} />
}
