"use client"

import { useResponsive } from "ahooks"
import { format, subDays } from "date-fns"
import { EChartsOption } from "echarts"
import * as echarts from "echarts"
import EChartsReact from "echarts-for-react"
import { Avatar, Button, Card } from "@nextui-org/react"

import { Col, Row } from "@/components/common/dimension"
import { Iconify } from "@/components/common/iconify"
import { cn } from "~/utils"
import { useChartData, useIsPending } from "./data-provider"

type SubChartData = {
    title: string
    data: number[]
}
function SubChart({
    className,
    data1,
    data2
}: {
    className: string
    data1?: SubChartData
    data2?: SubChartData
}) {
    function topChartOption(color: string, data?: number[]) {
        /** @type EChartsOption */
        return {
            grid: { top: 8, right: 8, bottom: 8, left: 8 },
            xAxis: {
                show: false,
                type: "category",
                data: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ]
            },
            yAxis: {
                show: false,
                type: "value"
            },
            series: [
                {
                    data: data,
                    type: "line",
                    smooth: true,
                    showSymbol: false,
                    lineStyle: { color, width: 3 },
                    areaStyle: {
                        opacity: 1,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color
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
    }

    return (
        <div
            className={cn(
                'items-center justify-between pt-10 lg:multi-["w-1/2;pt-0"]',
                className
            )}
        >
            <Row>
                <EChartsReact
                    option={topChartOption("#66aaf9", data1?.data)}
                    style={{ width: 200, height: 75 }}
                    opts={{ renderer: "svg" }}
                />
                <p className='text-lg font-bold lg:text-xl'>{data1?.title}</p>
            </Row>
            <Row>
                <EChartsReact
                    option={topChartOption("#ae7ede", data2?.data)}
                    style={{ width: 200, height: 75 }}
                    opts={{ renderer: "svg" }}
                />
                <p className='text-lg font-bold lg:text-xl'>{data2?.title}</p>
            </Row>
        </div>
    )
}

export default function Chart3({ className }: PageComponentProps) {
    const responsive = useResponsive()

    const today = new Date()
    const height = responsive?.md ? 380 : 250
    const width = responsive?.md ? 3 : 2

    const data = useChartData()?.large_chart
    const isPending = useIsPending()

    const option: EChartsOption = {
        xAxis: {
            type: "category",
            data: Array.from({ length: 10 }, (_, index) =>
                format(subDays(today, index), "d MMM")
            ).reverse(),
            axisLine: {
                show: false
            },
            axisLabel: {
                interval: 0,
                formatter: function (value) {
                    const dateParts = value.split(" ")
                    return `{a|${dateParts[0]}} ${dateParts[1]}`
                },
                rich: {
                    a: {
                        fontWeight: "bold"
                    }
                },
                margin: 25,
                rotate: responsive?.md ? 0 : -90
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: "solid",
                    color: "#ecedea"
                }
            }
        },
        yAxis: {
            type: "value",
            axisLine: {
                show: false
            },
            axisLabel: {
                formatter: function (value) {
                    return `${value}h`
                },
                margin: responsive?.md ? 25 : 15
            },
            splitLine: {
                show: false
            }
        },
        series: [
            {
                name: data?.chart3?.series1?.name,
                data: data?.chart3?.series1?.data,
                type: "line",
                smooth: true,
                showSymbol: false,
                lineStyle: { width },
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                    {
                        offset: 0,
                        color: "#ffffff"
                    },
                    {
                        offset: 1,
                        color: "#005bc4"
                    }
                ])
            },
            {
                name: data?.chart3?.series2?.name,
                data: data?.chart3?.series2?.data,
                type: "line",
                smooth: true,
                showSymbol: false,
                lineStyle: { type: "dashed", width },
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                    {
                        offset: 0,
                        color: "#ffffff"
                    },
                    {
                        offset: 1,
                        color: "#6020a0"
                    }
                ])
            }
        ],
        tooltip: {
            trigger: "axis"
        }
    }

    return (
        <Card className={cn("min-h-64 justify-between p-6 lg:p-12", className)}>
            <Row className='' items='start' justify='between'>
                <Avatar
                    isBordered
                    radius='sm'
                    src='/images/icon/004-fire.jpg'
                    size={responsive?.md ? "md" : "sm"}
                    className='ml-1 mt-1'
                />
                <Col items='start'>
                    <p className='text-2xl font-bold lg:text-3xl'>每日使用时间</p>
                    <p className='text-small text-default-400 lg:text-medium'>
                        Everyday everytime
                    </p>
                </Col>
                {responsive?.md && (
                    <SubChart
                        className='flex'
                        data1={data?.chart1}
                        data2={data?.chart2}
                    />
                )}
                <Button isIconOnly variant='light'>
                    <Iconify icon='solar:menu-dots-bold-duotone' />
                </Button>
            </Row>
            {!responsive?.md && (
                <SubChart
                    className='flex flex-col'
                    data1={data?.chart1}
                    data2={data?.chart2}
                />
            )}
            <EChartsReact
                option={option}
                style={{ width: "100%", height }}
                showLoading={isPending}
            />
        </Card>
    )
}
