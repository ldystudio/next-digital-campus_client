"use client"

import { EChartsOption } from "echarts"

import { ChartCard } from "@/components/business"

export default function Chart3({ className }: PageComponentProps) {
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
                data: [
                    { value: 1048, name: "大一" },
                    { value: 735, name: "大二" },
                    { value: 580, name: "大三" },
                    { value: 484, name: "大四" }
                ]
            }
        ]
    }

    const chartCardProps = {
        option,
        imgPath: "/images/icon/004-fire.jpg",
        title: "各年级人数比例",
        describe: "The proportion of students in each grade",
        heightArr: [300, 150] as [number, number],
        className
    }

    return <ChartCard {...chartCardProps} />
}
