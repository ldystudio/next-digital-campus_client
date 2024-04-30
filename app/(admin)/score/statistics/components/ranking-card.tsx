"use client"

import { Card } from "@nextui-org/react"

import { Row } from "@/components/common/dimension"
import { Iconify } from "@/components/common/iconify"
import { GoogleSans } from "~/config"
import { cn } from "~/utils"
import { useStatisticsData } from "./data-provider"

interface DescribeSubCardProps {
    title: string
    value?: number | string
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

export default function RankingCard({ className }: PageComponentProps) {
    const data = useStatisticsData()

    return (
        <div className={cn("flex flex-col gap-3 lg:gap-5", className)}>
            <DescribeSubCard
                title='班级排名'
                value={data?.class_rank}
                icon='solar:chart-square-line-duotone'
                color='success'
            />
            <DescribeSubCard
                title='成绩最高的课程'
                value={data?.best_course}
                icon='solar:graph-up-line-duotone'
                color='primary'
            />
            <DescribeSubCard
                title='成绩最低的课程'
                value={data?.worst_course}
                icon='solar:graph-down-line-duotone'
                color='danger'
            />
        </div>
    )
}
