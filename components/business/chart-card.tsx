import { useResponsive } from "ahooks"
import { EChartsOption } from "echarts"
import EChartsReact from "echarts-for-react"
import { Avatar, Button, Card } from "@nextui-org/react"

import { Col, Row } from "@/components/common/dimension"
import { Iconify } from "@/components/common/iconify"
import { cn } from "~/utils"

interface ChartCardProps {
    option: EChartsOption
    imgPath: string
    title: string
    describe?: string
    number?: number
    floating?: string
    subDescribe?: string
    heightArr?: [number, number]
    className?: string
}

export function ChartCard({
    option,
    heightArr,
    imgPath,
    title,
    describe,
    number,
    floating,
    subDescribe,
    className
}: ChartCardProps) {
    const responsive = useResponsive()
    const height = responsive?.md ? heightArr?.[0] || 150 : heightArr?.[1] || 75

    return (
        <Card className={cn("min-h-64 justify-between p-6", className)}>
            <Row fullWidth className='grow' justify='between'>
                <Avatar
                    isBordered
                    radius='sm'
                    src={imgPath}
                    size={responsive?.md ? "md" : "sm"}
                    className='ml-1 mt-1'
                />
                <Col items='center' className='text-nowrap'>
                    <p className='text-2xl font-bold lg:text-3xl'>{title}</p>
                    <p className='text-sm text-default-400 lg:text-base'>{describe}</p>
                </Col>
                <Button isIconOnly variant='light'>
                    <Iconify icon='solar:menu-dots-bold-duotone' />
                </Button>
            </Row>
            <div className='flex flex-col lg:flex-row lg:items-center'>
                {number && (
                    <div className='flex items-center justify-around lg:flex-col lg:items-start'>
                        <p className='flex items-center'>
                            <span className='text-3xl font-bold lg:text-4xl'>
                                {number}
                            </span>
                            <span className='ml-3 text-success-500'>{floating}</span>
                        </p>
                        <p className='text-small text-default-400 lg:mt-2 lg:text-medium '>
                            {subDescribe}
                        </p>
                    </div>
                )}
                <EChartsReact
                    option={option}
                    style={{ width: "100%", height }}
                    opts={{ renderer: "svg" }}
                />
            </div>
        </Card>
    )
}
