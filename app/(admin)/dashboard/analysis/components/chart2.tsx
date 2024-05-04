"use client"

import * as echarts from "echarts"
import { EChartsOption } from "echarts"

import { ChartCard } from "@/components/business/chart-card"
import { useChartData, useIsPending } from "./data-provider"

export default function Chart2({ className }: PageComponentProps) {
    const data = useChartData()?.chart2
    const isPending = useIsPending()

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
                data: data?.data ?? [],
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
        title: data?.title,
        describe: data?.describe,
        number: data?.number,
        floating: data?.floating,
        subDescribe: data?.subDescribe,
        isLoading: isPending,
        className
    }

    return <ChartCard {...chartCardProps} />
}
