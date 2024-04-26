"use client"

import React from "react"

import { useResponsive } from "ahooks"
import { Icon } from "@iconify/react"
import { Avatar, Badge, Button, Skeleton } from "@nextui-org/react"

import { Col } from "@/components/common/dimension"
import { Link } from "@/components/common/link"
import { cn, twx } from "~/utils"

export type MessageCardProps = React.HTMLAttributes<HTMLDivElement> & {
    avatar?: string
    message: React.ReactNode
    showFeedback?: boolean
    status?: "success" | "failed"
    isLoading: boolean
    className?: string
    messageClassName?: string
    onFeedback?: (feedback: "like" | "dislike") => void
}

const SkeletonBar = twx(Skeleton)`h-5 w-full rounded-lg`

export default function MessageCard({
    avatar,
    message,
    showFeedback,
    status,
    isLoading,
    className,
    messageClassName,
    onFeedback,
    ...props
}: MessageCardProps) {
    const [feedback, setFeedback] = React.useState<"like" | "dislike">()
    const responsive = useResponsive()

    const hasFailed = !isLoading && status === "failed"

    const failedMessageClassName = hasFailed
        ? "bg-danger-100/50 border border-danger-100 text-foreground"
        : ""

    const failedMessage = (
        <p>
            Something went wrong, if the issue persists please contact us through our
            help center at&nbsp;
            <Link href='https://mail.qq.com/' size='sm' isExternal>
                1187551003@qq.com
            </Link>
        </p>
    )

    const handleFeedback = React.useCallback(
        (liked: boolean) => {
            setFeedback(liked ? "like" : "dislike")

            onFeedback?.(liked ? "like" : "dislike")
        },
        [onFeedback]
    )

    return (
        <div {...props} className={cn("flex gap-3", className)}>
            <div className='relative flex-none'>
                <Badge
                    isOneChar
                    color='danger'
                    content={
                        <Icon
                            className='text-background'
                            icon='solar:danger-circle-bold'
                        />
                    }
                    isInvisible={!hasFailed}
                    placement='bottom-right'
                    shape='circle'
                >
                    <Avatar src={avatar} />
                </Badge>
            </div>
            <div className='flex w-full flex-col gap-4'>
                <div
                    className={cn(
                        "relative w-full rounded-medium bg-content2 px-4 py-3 text-default-600",
                        failedMessageClassName,
                        messageClassName
                    )}
                >
                    {isLoading ? (
                        <Col fullWidth space={3}>
                            {Array.from({ length: 7 }).map((_, i) => (
                                <SkeletonBar key={`SkeletonBar - ${i}`} />
                            ))}
                        </Col>
                    ) : (
                        <div className='pb-8 lg:multi-["pb-0;pr-20"]'>
                            {hasFailed ? failedMessage : message}
                        </div>
                    )}

                    {!isLoading && showFeedback && !hasFailed && (
                        <div
                            className={cn(
                                "absolute right-2 flex rounded-full bg-content2 shadow-small",
                                responsive?.md ? "top-2" : "bottom-2"
                            )}
                        >
                            <Button
                                isIconOnly
                                radius='full'
                                size='sm'
                                variant='light'
                                onPress={() => handleFeedback(true)}
                            >
                                {feedback === "like" ? (
                                    <Icon
                                        className='text-lg text-default-600'
                                        icon='solar:like-bold-duotone'
                                    />
                                ) : (
                                    <Icon
                                        className='text-lg text-default-600'
                                        icon='solar:like-line-duotone'
                                    />
                                )}
                            </Button>
                            <Button
                                isIconOnly
                                radius='full'
                                size='sm'
                                variant='light'
                                onPress={() => handleFeedback(false)}
                            >
                                {feedback === "dislike" ? (
                                    <Icon
                                        className='text-lg text-default-600'
                                        icon='solar:dislike-bold-duotone'
                                    />
                                ) : (
                                    <Icon
                                        className='text-lg text-default-600'
                                        icon='solar:dislike-line-duotone'
                                    />
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
