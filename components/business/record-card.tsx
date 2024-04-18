"use client"

import React from "react"

import type { CardProps } from "@nextui-org/react"
import { Icon } from "@iconify/react"
import { Card, CardBody } from "@nextui-org/react"

import { cn } from "~/utils"

export type ActionCardProps = CardProps & {
    icon: string
    title: string
    color?: "primary" | "secondary" | "success" | "warning" | "danger"
    description?: string
}

const RecordCard = React.forwardRef<HTMLDivElement, ActionCardProps>(
    ({ color, title, icon, description, children, className, ...props }, ref) => {
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
                case "success":
                    return {
                        card: "border-success-200",
                        iconWrapper: "bg-success-50 border-success-100",
                        icon: "text-success"
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
                ref={ref}
                isPressable
                className={cn("border-small", colors?.card, className)}
                shadow='sm'
                {...props}
            >
                <CardBody className='flex h-full flex-row items-center justify-between p-4 scrollbar-hide'>
                    <div className='flex flex-row gap-3'>
                        <div
                            className={cn(
                                "flex items-center rounded-medium border p-2",
                                colors?.iconWrapper
                            )}
                        >
                            <Icon className={colors?.icon} icon={icon} width={24} />
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-medium'>{title}</p>
                            <p className='text-small text-default-400'>{description}</p>
                        </div>
                    </div>
                    {children}
                </CardBody>
            </Card>
        )
    }
)

RecordCard.displayName = "RecordCard"

export default RecordCard
