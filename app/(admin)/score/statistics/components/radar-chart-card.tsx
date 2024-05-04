"use client"

import { EChartsOption } from "echarts"
import EChartsReact from "echarts-for-react"
import toast from "react-hot-toast"
import { Card } from "@nextui-org/react"

import { dark, primary } from "~/config"
import { useEffectOnce } from "~/hooks/common"
import { useIsPending, useStatisticsData, useUserInfo } from "./data-provider"

export default function RadarChartCard({ className }: PageComponentProps) {
    const data = useStatisticsData()
        ?.bar_chart.years.filter((year) => year <= new Date().getFullYear())
        .map((year) => `${year}`)

    const isPending = useIsPending()
    const userInfo = useUserInfo()

    useEffectOnce(() => {
        if (userInfo?.userRole === "admin") {
            toast.error("管理员无此页面的数据")
        }
    })

    function generateRandomArray(length: number): number[] {
        const array: number[] = []
        for (let i = 0; i < length; i++) {
            array.push(Math.floor(Math.random() * 61) + 40)
        }
        return array
    }

    const title =
        userInfo?.userRole !== "student"
            ? [
                  {
                      left: "center",
                      text: "综合能力雷达图"
                  },
                  {
                      left: "center",
                      top: "center",
                      text: "暂无数据"
                  }
              ]
            : {
                  left: "center",
                  text: "综合能力雷达图"
              }

    const option: EChartsOption = {
        title,
        legend: {
            left: "center",
            bottom: 0,
            data,
            itemGap: 20
        },
        radar: {
            indicator: [
                { name: "数学能力", max: 100 },
                { name: "语言表达能力", max: 100 },
                { name: "科学思维能力", max: 100 },
                { name: "创造力", max: 100 },
                { name: "社交技能", max: 100 },
                { name: "批判性思维", max: 100 }
            ],
            shape: "circle",
            splitNumber: 5,
            axisName: {
                color: dark
            },
            splitLine: {
                lineStyle: {
                    color: [
                        "rgba(244, 63, 94, 0.1)",
                        "rgba(244, 63, 94, 0.2)",
                        "rgba(244, 63, 94, 0.4)",
                        "rgba(244, 63, 94, 0.6)",
                        "rgba(244, 63, 94, 0.8)",
                        "rgb(244, 63, 94, 1)"
                    ].reverse()
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(244, 63, 94, 0.5)"
                }
            }
        },
        series: data?.map((year) => ({
            type: "radar",
            symbol: "none",
            areaStyle: {
                opacity: 0.3
            },
            lineStyle: {
                width: 1,
                opacity: 0.5
            },
            data: [
                {
                    name: year,
                    value:
                        userInfo?.userRole !== "student"
                            ? undefined
                            : generateRandomArray(6)
                }
            ]
        }))
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
