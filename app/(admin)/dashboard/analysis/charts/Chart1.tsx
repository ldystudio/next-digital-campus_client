"use client"

import { useResponsive } from "ahooks"
import clsx from "clsx"
import * as echarts from "echarts"
import { EChartsOption } from "echarts"
import { Avatar, Button, Card } from "@nextui-org/react"

import { Col, ECharts, Iconify, Row } from "@/components/common"
import { cn } from "~/utils"

export default function Chart1({ className }: { className?: string }) {
    /** @type EChartsOption */
    const option: EChartsOption = {
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
                data: new Array(14)
                    .fill(0)
                    .map(() => Math.round(Math.random() * (1300 - 800) + 800)),
                type: "line",
                // smooth: true,
                showSymbol: false,
                lineStyle: { color: "rgb(205, 240, 217)", width: 3 },
                areaStyle: {
                    opacity: 1,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgb(205, 240, 217)"
                        },
                        {
                            offset: 1,
                            color: "rgb(255,255,255,0.8)"
                        }
                    ])
                }
            }
        ],
        tooltip: {
            trigger: "none"
        }
    }
    const responsive = useResponsive()
    const height = responsive?.md ? 150 : 75

    return (
        <Card className={cn("min-h-64 justify-between p-6 lg:p-12", className)}>
            <Row className='' items='start' justify='between'>
                <Avatar
                    isBordered
                    radius='sm'
                    src='/images/icon/004-fire.jpg'
                    size={responsive?.md ? "md" : "sm"}
                />
                <Col items='start'>
                    <p className='text-2xl font-bold lg:text-3xl'>Financial</p>
                    <p className='text-small text-default-400 lg:text-medium'>
                        The Power in your Pocket
                    </p>
                </Col>
                <Button isIconOnly variant='light'>
                    <Iconify icon='solar:menu-dots-bold-duotone' />
                </Button>
            </Row>
            <div
                className={clsx(
                    "flex",
                    responsive?.md ? "flex-row items-center" : "flex-col"
                )}
            >
                <Col items='start'>
                    <p className='flex items-center'>
                        <span className='text-3xl font-bold lg:text-4xl'>$58745</span>
                        <span className='ml-3 text-success-500'>+4.5%</span>
                    </p>
                    <p className='text-small text-default-400 lg:text-medium'>
                        Total sale
                    </p>
                </Col>
                <ECharts option={option} style={{ width: "100%", height: height }} />
            </div>
        </Card>
    )
}
