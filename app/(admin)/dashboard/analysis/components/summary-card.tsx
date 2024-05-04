"use client"

import { Card, CardBody, CardHeader, CircularProgress } from "@nextui-org/react"

import { Iconify } from "@/components/common/iconify"
import { cn } from "~/utils"
import { useAnalyticsData } from "./data-provider"

interface CircularProgressCardProps {
    title?: string
    describe?: string
    icon: string
    numValue?: number
    showCircleRing?: boolean
    color?: "primary" | "secondary" | "success" | "warning" | "danger" | undefined
}

function CircularProgressCard({
    title,
    describe,
    icon,
    numValue,
    showCircleRing = true,
    color
}: CircularProgressCardProps) {
    const circularProgressClassNames = {
        primary: {
            svg: "w-28 h-28 drop-shadow-md",
            indicator: "stroke-primary",
            track: "stroke-primary/10",
            value: "text-2xl font-semibold text-primary"
        },
        secondary: {
            svg: "w-28 h-28 drop-shadow-md",
            indicator: "stroke-secondary",
            track: "stroke-secondary/10",
            value: "text-2xl font-semibold text-secondary"
        },
        success: {
            svg: "w-28 h-28 drop-shadow-md",
            indicator: "stroke-success",
            track: "stroke-success/10",
            value: "text-2xl font-semibold text-success"
        },
        warning: {
            svg: "w-28 h-28 drop-shadow-md",
            indicator: "stroke-warning",
            track: "stroke-warning/10",
            value: "text-2xl font-semibold text-warning"
        },
        danger: {
            svg: "w-28 h-28 drop-shadow-md",
            indicator: "stroke-danger",
            track: "stroke-danger/10",
            value: "text-2xl font-semibold text-danger"
        },
        default: {
            svg: "w-28 h-28 drop-shadow-md",
            indicator: "stroke-default",
            track: "stroke-default/10",
            value: "text-2xl font-semibold text-default"
        }
    }

    return (
        <Card className='justify-center'>
            <CardHeader className='flex-col justify-center text-nowrap'>
                <Iconify icon={icon} color={color} className='mb-1' />
                <p>{title}</p>
                <p className='text-2xl font-bold'>{describe}</p>
            </CardHeader>
            {showCircleRing && (
                <CardBody className='items-center justify-end pt-0 scrollbar-hide'>
                    <CircularProgress
                        aria-label={`Circular Progress - ${title}`}
                        classNames={
                            color
                                ? circularProgressClassNames[color]
                                : circularProgressClassNames.default
                        }
                        value={numValue}
                        valueLabel={`+${numValue}%`}
                        strokeWidth={2}
                        showValueLabel={true}
                    />
                    <p className='mt-1 text-small text-default-400'>相较于昨天</p>
                </CardBody>
            )}
        </Card>
    )
}

export default function SummaryCard({ className }: PageComponentProps) {
    const data = useAnalyticsData()

    return (
        <div className={cn("grid grid-cols-2 gap-3 *:rounded-3xl lg:gap-5", className)}>
            <CircularProgressCard
                title={data?.first?.title}
                describe={data?.first?.describe}
                icon={data?.first?.icon ?? ""}
                numValue={data?.first?.numValue}
                color='primary'
            />
            <CircularProgressCard
                title={data?.second?.title}
                describe={data?.second?.describe}
                icon={data?.second?.icon ?? ""}
                numValue={data?.second?.numValue}
                color='secondary'
            />
            <CircularProgressCard
                title={data?.third?.title}
                describe={data?.third?.describe}
                icon={data?.third?.icon ?? ""}
                color='success'
                showCircleRing={false}
            />
            <CircularProgressCard
                title={data?.fourth?.title}
                describe={data?.fourth?.describe}
                icon={data?.fourth?.icon ?? ""}
                color='warning'
                showCircleRing={false}
            />
        </div>
    )
}
