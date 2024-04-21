"use client"

import React from "react"

import type { CardProps } from "@nextui-org/react"
import clsx from "clsx"
import { Icon } from "@iconify/react"
import { Card, CardBody } from "@nextui-org/react"

import { Row } from "@/components/common/dimension"
import { GoogleSans } from "~/config"
import { cn } from "~/utils"

export type ScoreQuery = {
    course_name: string
    exam_date: string
    exam_type: number
    exam_score: number
}

type ScoreCardProps = CardProps &
    Omit<ScoreQuery, "exam_type"> & {
        icon: string
        color?: "primary" | "secondary" | "warning" | "danger"
    }

export default function ScoreCard({
    color,
    course_name,
    icon,
    exam_score,
    exam_date,
    className,
    ...props
}: ScoreCardProps) {
    const colors = React.useMemo(() => {
        switch (color) {
            case "primary":
                return {
                    card: "border-default-200",
                    iconWrapper: "bg-primary-50 border-primary-100",
                    icon: "text-primary"
                }
            case "secondary":
                return {
                    card: "border-secondary-100",
                    iconWrapper: "bg-secondary-50 border-secondary-100",
                    icon: "text-secondary"
                }
            case "warning":
                return {
                    card: "border-warning-500",
                    iconWrapper: "bg-warning-50 border-warning-100",
                    icon: "text-warning-600"
                }
            case "danger":
                return {
                    card: "border-danger-300",
                    iconWrapper: "bg-danger-50 border-danger-100",
                    icon: "text-danger"
                }

            default:
                return {
                    card: "border-default-200",
                    iconWrapper: "bg-default-50 border-default-100",
                    icon: "text-default-500"
                }
        }
    }, [color])

    return (
        <Card
            isPressable
            className={cn("border-small", colors?.card, className)}
            shadow='sm'
            {...props}
        >
            <CardBody className='h-full flex-row items-center justify-between p-4'>
                <Row space={3}>
                    <div
                        className={cn(
                            "flex items-center rounded-medium border p-2",
                            colors?.iconWrapper
                        )}
                    >
                        <Icon className={colors?.icon} icon={icon} width={24} />
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-medium'>{course_name}</p>
                        <p className='text-small text-default-400'>{exam_date}</p>
                    </div>
                </Row>
                <div
                    className={clsx(
                        `text-lg font-bold ${GoogleSans.className}`,
                        exam_score >= 60
                            ? exam_score >= 80
                                ? "text-success"
                                : "text-warning"
                            : "text-danger"
                    )}
                >
                    {exam_score}
                </div>
            </CardBody>
        </Card>
    )
}
