"use client"

import { useResponsive } from "ahooks"
import { EChartsOption } from "echarts"
import EChartsReact from "echarts-for-react"
import useSWR from "swr"
import { Card } from "@nextui-org/react"

import { request } from "~/service/request"

interface AttendanceChartCardProps {
    url: string
}

const fetcher = (url: string) =>
    request.get<[string, number][]>(url).then((res) => res.data)

export default function AttendanceChartCard({ url }: AttendanceChartCardProps) {
    const responsive = useResponsive()
    const toYear = `${new Date().getFullYear()}`

    const { data: fetchData } = useSWR(url, fetcher, { revalidateOnFocus: false })
    const data = fetchData ?? []

    const orient = responsive?.md ? "horizontal" : "vertical"
    const color = "#fff"
    const textBorderWidth = 3
    const textBorderColor = "#000"

    /** @type EChartsOption */
    const option: EChartsOption = {
        title: {
            top: 30,
            text: toYear + "年度考勤数据",
            left: "center",
            textStyle: { color, textBorderWidth, textBorderColor }
        },
        tooltip: {
            trigger: "item"
        },
        visualMap: {
            min: 0,
            max: 5,
            type: "piecewise",
            orient: "horizontal",
            left: "center",
            textStyle: { color: "#000" },
            bottom: 40
        },
        legend: {
            top: "30",
            left: "100",
            data: ["每日", "Top 12"],
            textStyle: { color, textBorderWidth, textBorderColor }
        },
        calendar: [
            {
                top: 100,
                left: "center",
                orient,
                range: [toYear + "-01-01", toYear + "-06-30"],
                dayLabel: {
                    firstDay: 1,
                    color,
                    textBorderWidth,
                    textBorderColor
                },
                monthLabel: { color, textBorderWidth, textBorderColor },
                yearLabel: {
                    formatter: "{start}  1st",
                    color,
                    textBorderWidth,
                    textBorderColor
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color,
                        width: 4,
                        type: "solid"
                    }
                },
                itemStyle: {
                    color: "#52525b",
                    borderWidth: 1,
                    borderColor: color
                }
            },
            {
                top: 340,
                left: "center",
                range: [toYear + "-07-01", toYear + "-12-31"],
                orient,
                dayLabel: {
                    firstDay: 1,
                    color,
                    textBorderWidth,
                    textBorderColor
                },
                monthLabel: { color, textBorderWidth, textBorderColor },
                yearLabel: {
                    formatter: "{start}  2nd",
                    color,
                    textBorderWidth,
                    textBorderColor
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color,
                        width: 4,
                        type: "solid"
                    }
                },
                itemStyle: {
                    color: "#52525b",
                    borderWidth: 1,
                    borderColor: color
                }
            }
        ],
        series: [
            {
                name: "每日",
                type: "heatmap",
                coordinateSystem: "calendar",
                data: data
            },
            {
                name: "每日",
                type: "heatmap",
                coordinateSystem: "calendar",
                calendarIndex: 1,
                data: data
            },
            {
                name: "Top 12",
                type: "effectScatter",
                coordinateSystem: "calendar",
                calendarIndex: 1,
                data: data
                    .sort(function (a, b) {
                        return b[1] - a[1]
                    })
                    .slice(0, 12),
                symbolSize: function (val) {
                    return val[1]
                },
                showEffectOn: "render",
                rippleEffect: {
                    brushType: "stroke"
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: "#333"
                },
                zlevel: 1
            },
            {
                name: "Top 12",
                type: "effectScatter",
                coordinateSystem: "calendar",
                data: data
                    .sort(function (a, b) {
                        return b[1] - a[1]
                    })
                    .slice(0, 12),
                symbolSize: function (val) {
                    return val[1]
                },
                showEffectOn: "render",
                rippleEffect: {
                    brushType: "stroke"
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: "#333"
                },
                zlevel: 1
            }
        ]
    }

    return (
        <Card
            className='hidden h-full items-center justify-center lg:flex lg:w-full'
            shadow='none'
        >
            <EChartsReact
                option={option}
                style={{
                    width: "100%",
                    height: "36rem"
                }}
                opts={{ renderer: "canvas" }}
            />
        </Card>
    )
}
