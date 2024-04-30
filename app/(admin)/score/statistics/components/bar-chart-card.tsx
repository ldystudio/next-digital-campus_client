"use client"

import { useResponsive } from "ahooks"
import { EChartsOption } from "echarts"
import EChartsReact from "echarts-for-react"
import { Card } from "@nextui-org/react"

import { primary } from "~/config"
import { useIsPending, useStatisticsData } from "./data-provider"

export default function BarChartCard({ className }: PageComponentProps) {
    // const responsive = useResponsive()
    // const fontSize = responsive?.lg ? 28 : responsive?.md ? 24 : 20
    const data = useStatisticsData()?.bar_chart
    const isPending = useIsPending()

    const app: any = {}
    const posList = [
        "left",
        "right",
        "top",
        "bottom",
        "inside",
        "insideTop",
        "insideLeft",
        "insideRight",
        "insideBottom",
        "insideTopLeft",
        "insideTopRight",
        "insideBottomLeft",
        "insideBottomRight"
    ] as const

    app.configParameters = {
        rotate: {
            min: -90,
            max: 90
        },
        align: {
            options: {
                left: "left",
                center: "center",
                right: "right"
            }
        },
        verticalAlign: {
            options: {
                top: "top",
                middle: "middle",
                bottom: "bottom"
            }
        },
        position: {
            options: posList.reduce(
                function (map, pos) {
                    map[pos] = pos
                    return map
                },
                {} as Record<string, string>
            )
        },
        distance: {
            min: 0,
            max: 100
        }
    }

    app.config = {
        rotate: 90,
        align: "left",
        verticalAlign: "middle",
        position: "insideBottom",
        distance: 15
    }
    console.log("app: ", app)

    type BarLabelOption = NonNullable<echarts.BarSeriesOption["label"]>

    const labelOption: BarLabelOption = {
        show: true,
        position: app.config.position as BarLabelOption["position"],
        distance: app.config.distance as BarLabelOption["distance"],
        align: app.config.align as BarLabelOption["align"],
        verticalAlign: app.config.verticalAlign as BarLabelOption["verticalAlign"],
        rotate: app.config.rotate as BarLabelOption["rotate"],
        formatter: "{c}  {name|{a}}",
        fontSize: 16,
        rich: {
            name: {}
        }
    }

    const series: EChartsOption["series"] = Object.keys(data?.values ?? {}).map(
        (key) => ({
            name: key,
            type: "bar",
            barGap: 0,
            label: labelOption,
            emphasis: {
                focus: "series"
            },
            data: data?.values?.[key]
        })
    )

    const option: EChartsOption = {
        tooltip: {
            trigger: "axis",
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
                magicType: { show: true, type: ["bar", "stack"] },
                saveAsImage: { show: true }
            }
        },
        xAxis: [
            {
                type: "category",
                axisTick: { show: false },
                data: data?.years
            }
        ],
        yAxis: [
            {
                type: "value"
            }
        ],
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
                    height: "100%"
                }}
                opts={{ renderer: "svg" }}
                showLoading={isPending}
                loadingOption={loadingOption}
            />
        </Card>
    )
}
