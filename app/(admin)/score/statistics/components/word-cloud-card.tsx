"use client"

import React from "react"

import EChartsReact from "echarts-for-react"
import { Card, Spinner } from "@nextui-org/react"

import { primary } from "~/config"
import { cn } from "~/utils"
import { useIsPending, useStatisticsData, useUserInfo } from "./data-provider"

export default function WordCloudCard({ className }: PageComponentProps) {
    const [wordCloudInitialized, setWordCloudInitialized] = React.useState(false)

    const data = useStatisticsData()?.word_cloud
    const isPending = useIsPending()
    const userInfo = useUserInfo()

    React.useEffect(() => {
        if (!wordCloudInitialized) {
            import("echarts-wordcloud").then(() => setWordCloudInitialized(true))
        }
    }, [wordCloudInitialized])

    const sizeRange = userInfo?.userRole !== "student" ? [10, 40] : [20, 70]

    const option = {
        title: {
            top: "3%",
            left: "center",
            text: "课程标签云"
        },
        series: [
            {
                type: "wordCloud",
                shape: "circle",
                keepAspect: true,
                sizeRange,
                rotationStep: 30,
                drawOutOfBound: true,
                shrinkToFit: true,
                textStyle: {
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    color: function () {
                        return (
                            "rgb(" +
                            [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(",") +
                            ")"
                        )
                    }
                },
                emphasis: {
                    focus: "self",
                    textStyle: {
                        textShadowBlur: 2,
                        textShadowColor: "#333"
                    }
                },
                data: data ?? [],
                autoSize: {
                    enable: true,
                    minSize: 6
                }
            }
        ]
    }

    const loadingOption = {
        lineWidth: 2,
        color: primary,
        text: "正在加载..."
    }

    return (
        <Card className={cn("justify-center", className)}>
            {wordCloudInitialized ? (
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
            ) : (
                <Spinner label='Loading...' />
            )}
        </Card>
    )
}
