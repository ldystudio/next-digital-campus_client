"use client"

import { EChartsOption } from "echarts"

import { ChartCard } from "@/components/business/chart-card"
import { useChartData, useIsPending } from "./data-provider"

export default function Chart3({ className }: PageComponentProps) {
    const data = useChartData()?.chart3
    const isPending = useIsPending()

    /** @type EChartsOption */
    const option: EChartsOption = {
        tooltip: {
            trigger: "item"
        },
        series: [
            {
                type: "pie",
                radius: ["40%", "75%"],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: "center"
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 24,
                        fontWeight: "bold"
                    }
                },
                labelLine: {
                    show: false
                },
                data: data?.data ?? []
            }
        ]
    }

    const chartCardProps = {
        option,
        imgPath: "/images/icon/004-fire.jpg",
        title: data?.title,
        describe: data?.describe,
        heightArr: [300, 150] as [number, number],
        isLoading: isPending,
        className
    }

    return <ChartCard {...chartCardProps} />
}
