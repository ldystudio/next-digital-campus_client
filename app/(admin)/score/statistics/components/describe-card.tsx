"use client"

import { Card } from "@nextui-org/react"

import { Row } from "@/components/common/dimension"
import { Iconify } from "@/components/common/iconify"
import { GoogleSans } from "~/config"
import { cn } from "~/utils"
import { useStatisticsData } from "./data-provider"

interface DescribeSubCardProps {
    title: string
    value?: number
    icon: string
    color?:
        | "primary"
        | "secondary"
        | "success"
        | "warning"
        | "danger"
        | "light"
        | "dark"
}

function DescribeSubCard({ title, value, icon, color }: DescribeSubCardProps) {
    return (
        <Card className='h-full items-center justify-center rounded-3xl py-2 text-lg font-medium text-default-800 lg:gap-3'>
            <Row>
                <Iconify icon={icon} color={color} />
                <p>{title}</p>
            </Row>
            <p className={`text-3xl font-bold ${GoogleSans.className}`}>{value}</p>
        </Card>
    )
}

export default function DescribeCard({ className }: PageComponentProps) {
    const data = useStatisticsData()

    return (
        <div className={cn("flex flex-col gap-3 lg:gap-5", className)}>
            <DescribeSubCard
                title='最高分'
                value={data?.max}
                icon='solar:graph-up-line-duotone'
                color='success'
            />
            <DescribeSubCard
                title='平均分'
                value={data?.avg && Math.floor(data.avg)}
                icon='solar:graph-line-duotone'
                color='primary'
            />
            <DescribeSubCard
                title='最低分'
                value={data?.min}
                icon='solar:graph-down-line-duotone'
                color='danger'
            />
        </div>
    )
}
