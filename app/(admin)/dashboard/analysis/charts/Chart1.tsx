"use client"

import * as echarts from "echarts"
import { EChartsOption } from "echarts"

import { ChartCard } from "@/components/business"

export default function Chart1({ className }: { className?: string }) {
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
                lineStyle: { color: "#66aaf9", width: 3 },
                areaStyle: {
                    opacity: 1,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "#66aaf9"
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
        title: "学生签到率统计",
        describe: "Student attendance statistics",
        number: 5467,
        floating: "+4.5%",
        subDescribe: "签到人数",
        className
    }

    return <ChartCard {...chartCardProps} />
}
