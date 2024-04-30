"use client"

import { useResponsive } from "ahooks"
import { EChartsOption } from "echarts"
import EChartsReact from "echarts-for-react"
import { Card } from "@nextui-org/react"

import { primary } from "~/config"
import { useIsPending, useStatisticsData } from "./data-provider"

export default function BarChartCard({ className }: PageComponentProps) {
    const responsive = useResponsive()
    // const fontSize = responsive?.lg ? 28 : responsive?.md ? 24 : 20
    const data = useStatisticsData()?.bar_chart
    const isPending = useIsPending()

    const series: EChartsOption["series"] = Object.keys(data?.values ?? {}).map(
        (key) => ({
            name: key,
            type: "bar",
            barGap: 0,
            label: {
                show: true,
                rotate: 90,
                align: "left",
                verticalAlign: "middle",
                position: "insideBottom",
                distance: 15,
                fontSize: 16,
                formatter: "{c}  {name|{a}}",
                rich: {
                    name: {}
                }
            },
            emphasis: {
                focus: "series"
            },
            data: data?.values?.[key]
        })
    )

    const option: EChartsOption = {
        title: {
            left: "center",
            top: "3%",
            text: "每学年期末成绩统计"
        },
        tooltip: {
            trigger: "item",
            axisPointer: {
                type: "shadow"
            }
        },
        legend: {
            left: "center",
            bottom: "5%",
            data: data?.names
        },
        toolbox: {
            show: true,
            orient: "vertical",
            left: "right",
            top: "center",
            feature: {
                mark: { show: true },
                dataZoom: { show: true },
                magicType: {
                    show: true,
                    type: ["stack"],
                    option: { stack: { labelLayout: { hideOverlap: true } } }
                },
                saveAsImage: { show: true }
            }
        },
        xAxis: {
            type: "category",
            axisTick: { show: false },
            data: data?.years
        },
        yAxis: {
            type: "value"
        },
        series
    }

    const loadingOption = {
        lineWidth: 2,
        color: primary,
        text: "正在加载..."
    }

    return (
        <Card className={className}>
            <EChartsReact
                option={option}
                style={{
                    width: "100%",
                    height: "100%",
                    rotate: responsive?.md ? undefined : "90deg"
                }}
                opts={{ renderer: "svg" }}
                showLoading={isPending}
                loadingOption={loadingOption}
            />
        </Card>
    )
}
