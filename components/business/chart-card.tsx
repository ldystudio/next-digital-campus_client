import { useResponsive } from "ahooks"
import * as echarts from "echarts"
import { EChartsOption } from "echarts"
import EChartsReact from "echarts-for-react"
import { Avatar, Button, Card } from "@nextui-org/react"

import { Col, Iconify, Row } from "@/components/common"
import { cn } from "~/utils"

interface ChartCardProps {
    xData: string[]
    yData: number[]
    color: string
    imgPath: string
    title: string
    describe: string
    number: number
    floating: string
    subDescribe: string
    className?: string
}

export function ChartCard({
    xData,
    yData,
    color,
    imgPath,
    title,
    describe,
    number,
    floating,
    subDescribe,
    className
}: ChartCardProps) {
    /** @type EChartsOption */
    const option: EChartsOption = {
        grid: { top: 8, right: 8, bottom: 8, left: 8 },
        xAxis: {
            show: false,
            type: "category",
            data: xData
        },
        yAxis: {
            show: false,
            type: "value"
        },
        series: [
            {
                data: yData,
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
    const responsive = useResponsive()
    const height = responsive?.md ? 150 : 75

    return (
        <Card className={cn("min-h-64 justify-between p-6 lg:p-12", className)}>
            <Row className='' items='start' justify='between'>
                <Avatar
                    isBordered
                    radius='sm'
                    src={imgPath}
                    size={responsive?.md ? "md" : "sm"}
                    className='ml-1 mt-1'
                />
                <Col items='start'>
                    <p className='text-2xl font-bold lg:text-3xl'>{title}</p>
                    <p className='text-small text-default-400 lg:text-medium'>
                        {describe}
                    </p>
                </Col>
                <Button isIconOnly variant='light'>
                    <Iconify icon='solar:menu-dots-bold-duotone' />
                </Button>
            </Row>
            <div className='flex flex-col lg:flex-row lg:items-center'>
                <div className='flex items-center justify-around lg:flex-col lg:items-start'>
                    <p className='flex items-center'>
                        <span className='text-3xl font-bold lg:text-4xl'>{number}</span>
                        <span className='ml-3 text-success-500'>{floating}</span>
                    </p>
                    <p className='text-small text-default-400 lg:mt-2 lg:text-medium '>
                        {subDescribe}
                    </p>
                </div>
                <EChartsReact option={option} style={{ width: "100%", height }} />
            </div>
        </Card>
    )
}
