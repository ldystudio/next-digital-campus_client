"use client"

import { useResponsive } from "ahooks"
import { EChartsOption } from "echarts"
import EChartsReact from "echarts-for-react"
import { Card } from "@nextui-org/react"

import { useStatisticsData } from "./data-provider"

export default function DistributionCard({ className }: PageComponentProps) {
    const responsive = useResponsive()
    const fontSize = responsive?.lg ? 28 : responsive?.md ? 24 : 20

    const data = useStatisticsData()

    const option: EChartsOption = {
        title: {
            top: "3%",
            left: "center",
            text: "成绩分布图"
        },
        tooltip: {
            trigger: "item"
        },
        legend: {
            bottom: "5%",
            left: "center"
        },
        series: [
            {
                type: "pie",
                radius: ["40%", "70%"],
                avoidLabelOverlap: false,
                padAngle: 2,
                itemStyle: {
                    borderRadius: 10
                },
                label: {
                    show: false,
                    position: "center"
                },
                emphasis: {
                    focus: "self",
                    label: {
                        show: true,
                        fontSize,
                        fontWeight: "bold"
                    }
                },
                labelLine: {
                    show: false
                },
                tooltip: {
                    valueFormatter: function (value) {
                        return (value as number) + " 门课"
                    }
                },
                data: data?.pie_chart
            }
        ]
    }

    return (
        <Card className={className}>
            <EChartsReact
                option={option}
                style={{
                    width: "100%",
                    height: "100%"
                }}
                opts={{ renderer: "svg" }}
            />
        </Card>
    )
}
