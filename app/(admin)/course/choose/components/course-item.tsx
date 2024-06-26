import React from "react"

import { isWithinInterval, parseISO } from "date-fns"
import { Icon } from "@iconify/react"
import { AvatarGroup, Button, Image, Skeleton, Tooltip } from "@nextui-org/react"

import DicebearAvatar from "@/components/common/avatar"
import { Row } from "@/components/common/dimension"
import { notice } from "@/components/common/notice"
import { updateCourseChoose } from "~/service/api"
import { cn } from "~/utils"

export type CourseItem = {
    id: string
    course_name: string
    course_description: string
    course_picture: string
    class_location?: string
    credit: string
    start_time: string
    end_time: string
    choose_number: number
    weekday: number
    start_date: string
    end_date: string
    teacher: {
        id: string | number
        real_name: string
        email: string
        avatar: string
    }[]
}

type CourseListItemProps = {
    className?: string
    isPopular?: boolean
    isLoading?: boolean
    removeWrapper?: boolean
    onOpen: () => void
    setSelectedCourseId: (id: string) => void
} & CourseItem

export default function CourseListItem({
    course_name,
    course_picture,
    class_location,
    credit,
    choose_number,
    start_time,
    end_time,
    weekday,
    start_date,
    end_date,
    teacher,
    isLoading,
    removeWrapper,
    className,
    onOpen,
    setSelectedCourseId,
    ...props
}: CourseListItemProps) {
    const [isLiked, setIsLiked] = React.useState(false)
    const chineseNumbers: string[] = ["", "一", "二", "三", "四", "五", "六", "七"]
    const isValid = isWithinInterval(new Date(), {
        start: parseISO(start_date),
        end: parseISO(end_date)
    })

    return (
        <div
            className={cn(
                "relative flex flex-none flex-col gap-3",
                {
                    "rounded-none bg-background shadow-none": removeWrapper
                },
                className
            )}
            {...props}
        >
            <Button
                isIconOnly
                className={cn(
                    `absolute right-3 top-3 z-20 bg-background/60 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50`,
                    !isValid && "bg-danger dark:bg-danger"
                )}
                radius='full'
                size='sm'
                variant='flat'
                isDisabled={!isValid}
                onPress={async () => {
                    const { error } = await updateCourseChoose<CourseItem>(props.id)
                    if (error) {
                        notice.error({
                            title: "选课失败",
                            description: `${error.msg}，请稍后再试`
                        })
                    } else {
                        setIsLiked(!isLiked)
                        notice.success({
                            title: "选课成功",
                            description: `已成功选课：${course_name}`
                        })
                    }
                }}
            >
                <Icon
                    className={cn(isValid ? "text-default-900/50" : "text-default-50", {
                        "text-danger-400": isLiked
                    })}
                    icon='solar:star-bold'
                    width={16}
                />
            </Button>
            <Image
                isBlurred
                isZoomed
                alt={course_name}
                className='aspect-square w-full hover:scale-110'
                isLoading={isLoading}
                src={course_picture}
                onClick={() => {
                    setSelectedCourseId(props.id)
                    onOpen()
                }}
            />

            <div className='mt-1 flex flex-col gap-2 px-1'>
                {isLoading ? (
                    <div className='my-1 flex flex-col gap-3'>
                        <Skeleton className='w-3/5 rounded-lg'>
                            <div className='h-3 w-3/5 rounded-lg bg-default-200' />
                        </Skeleton>
                        <Skeleton className='mt-3 w-4/5 rounded-lg'>
                            <div className='h-3 w-4/5 rounded-lg bg-default-200' />
                        </Skeleton>
                        <Skeleton className='mt-4 w-2/5 rounded-lg'>
                            <div className='h-3 w-2/5 rounded-lg bg-default-300' />
                        </Skeleton>
                    </div>
                ) : (
                    <>
                        <Row justify='between'>
                            <h3 className='font-medium text-default-700'>
                                {course_name}
                            </h3>
                            <Row space={2} className='text-default-500'>
                                <span>{choose_number}</span>
                                <Icon
                                    icon='solar:user-heart-line-duotone'
                                    height='auto'
                                />
                            </Row>
                        </Row>
                        <div className='flex flex-col items-center justify-between text-default-500 md:flex-row'>
                            <span>星期{chineseNumbers[weekday]}</span>
                            <span>
                                {start_time.slice(0, 5)}~{end_time.slice(0, 5)}
                            </span>
                            <span>{class_location}</span>
                        </div>
                        <div className='flex flex-col items-center justify-between text-default-500 md:flex-row'>
                            <span>{credit}学分</span>
                            <Row space={2}>
                                教师：
                                <AvatarGroup
                                    isBordered
                                    max={5}
                                    className='justify-start'
                                >
                                    {teacher.map((row) => (
                                        <Tooltip
                                            key={row.id}
                                            content={
                                                <div className='w-11'>
                                                    {row.real_name}
                                                </div>
                                            }
                                        >
                                            <DicebearAvatar avatar={row.avatar} />
                                        </Tooltip>
                                    ))}
                                </AvatarGroup>
                            </Row>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
