"use client"

import { useResponsive } from "ahooks"
import * as echarts from "echarts"
import { EChartsOption } from "echarts"
import EChartsReact from "echarts-for-react"
import { Card } from "@nextui-org/react"

export default function AttendanceChartCard() {
    const responsive = useResponsive()
    const toYear = `${new Date().getFullYear()}`

    function getVirtualData(year: string) {
        const date = +echarts.time.parse(year + "-01-01")
        const end = +echarts.time.parse(+year + 1 + "-01-01")
        const dayTime = 3600 * 24 * 1000
        const data: [string, number][] = []
        for (let time = date; time < end; time += dayTime) {
            data.push([
                echarts.time.format(time, "{yyyy}-{MM}-{dd}", false),
                Math.floor(Math.random() * 10000)
            ])
        }
        return data
    }

    const data = getVirtualData(toYear)
    console.log("data: ", data)

    const orient = responsive?.md ? "horizontal" : "vertical"
    const color = "#fff"
    const textBorderColor = "#000"

    /** @type EChartsOption */
    const option: EChartsOption = {
        title: {
            top: 30,
            text: toYear + "年度考勤数据",
            left: "center",
            textStyle: { color, textBorderWidth: 4, textBorderColor }
        },
        tooltip: {
            trigger: "item"
        },
        visualMap: {
            min: 0,
            max: 10000,
            type: "piecewise",
            orient: "horizontal",
            left: "center",
            textStyle: { color, textBorderWidth: 4, textBorderColor },
            bottom: 40
        },
        legend: {
            top: "30",
            left: "100",
            data: ["每日", "Top 12"],
            textStyle: { color, textBorderWidth: 4, textBorderColor }
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
                    textBorderWidth: 4,
                    textBorderColor
                },
                monthLabel: { color, textBorderWidth: 4, textBorderColor },
                yearLabel: {
                    formatter: "{start}  1st",
                    color,
                    textBorderWidth: 4,
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
                    color: "#3F3F46",
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
                    textBorderWidth: 4,
                    textBorderColor
                },
                monthLabel: { color, textBorderWidth: 4, textBorderColor },
                yearLabel: {
                    formatter: "{start}  2nd",
                    color,
                    textBorderWidth: 4,
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
                    color: "#3F3F46",
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
                    return val[1] / 500
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
                    return val[1] / 500
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
            className='hidden h-full items-center justify-center bg-cover bg-center bg-no-repeat bg-unsplash-[0l1zx7JYwFk/lg] lg:flex lg:w-full'
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
