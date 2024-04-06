"use client"

import React, { useMemo, useState } from "react"

import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import * as adventurer from "@dicebear/adventurer"
import { createAvatar } from "@dicebear/core"
import { Icon } from "@iconify/react"
import {
    Avatar,
    AvatarGroup,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Image,
    Input,
    Pagination,
    Skeleton,
    Tooltip
} from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"

import { Row, SearchIcon } from "@/components/common"
import OverlayScrollbar from "@/components/common/overlay-scrollbar"
import SingleSelection from "@/components/custom/single-selection"
import { useTableParams } from "~/hooks/business"
import { useEffectOnce } from "~/hooks/common"
import { fetchCourseList } from "~/service/api"
import { cn } from "~/utils"

interface CourseListCardProps {
    columns: Columns
    filterColumns: Columns
    url: string
}

type CourseItem = {
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
} & CourseItem

function useCourseList() {
    const { isPending, data } = useQuery({
        queryKey: ["courseChoose"],
        queryFn: async () => (await fetchCourseList<CourseItem>()).data
    })
    return { data, isPending }
}

function CourseListItem({
    course_name,
    course_picture,
    class_location,
    credit,
    choose_number,
    start_time,
    end_time,
    weekday,
    teacher,
    isLoading,
    removeWrapper,
    className,
    ...props
}: CourseListItemProps) {
    const [isLiked, setIsLiked] = React.useState(false)
    const chineseNumbers: string[] = ["", "一", "二", "三", "四", "五", "六", "七"]

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
                className='absolute right-3 top-3 z-20 bg-background/60 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50'
                radius='full'
                size='sm'
                variant='flat'
                onPress={() => setIsLiked(!isLiked)}
            >
                <Icon
                    className={cn("text-default-900/50", {
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
                                            <Avatar
                                                src={createAvatar(adventurer, {
                                                    seed: row.avatar
                                                }).toDataUriSync()}
                                            />
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

export default function CourseListCard({
    columns,
    filterColumns,
    url
}: CourseListCardProps) {
    const [selectedFilterKeys, setSelectedFilterKeys] = useState(new Set(["id"]))

    const {
        filterValue,
        page,
        setPage,
        rows,
        pageData,
        pages,
        isLoading,
        onNextPage,
        onPreviousPage,
        onSearchChange,
        onClear,
        setRowsPerPage
    } = useTableParams({
        columns,
        url,
        selectedFilterKeys
    })

    useEffectOnce(() => {
        setRowsPerPage(12)
    })

    const selectedValue = useMemo(
        () =>
            filterColumns.find(
                (filterColumns) =>
                    filterColumns.uid === Array.from(selectedFilterKeys).join(", ")
            )?.name,
        [filterColumns, selectedFilterKeys]
    )

    return (
        <Card className='my-auto h-full rounded-3xl'>
            <CardHeader>
                <div className='flex gap-3'>
                    <SingleSelection
                        columns={filterColumns}
                        selectedValue={selectedValue!}
                        selectedFilterKeys={selectedFilterKeys}
                        setSelectedFilterKeys={setSelectedFilterKeys}
                    />
                    <Input
                        isClearable
                        fullWidth
                        placeholder={`按${selectedValue}搜索...`}
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={onClear}
                        onValueChange={onSearchChange}
                    />
                </div>
            </CardHeader>

            <CardBody>
                <OverlayScrollbar>
                    <Card className='grid h-full grid-cols-2 gap-5 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
                        {(rows as unknown as CourseItem[])?.map((course) => (
                            <CourseListItem
                                key={course.id}
                                isLoading={isLoading}
                                {...course}
                            />
                        ))}
                    </Card>
                </OverlayScrollbar>
            </CardBody>

            <CardFooter className='flex items-center justify-between'>
                <span className='hidden w-[30%] text-small text-default-400 md:block'>
                    共{pageData?.count}条可选课程
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color='primary'
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className='hidden w-[30%] justify-end gap-2 sm:flex'>
                    <Button
                        isDisabled={pages === 1}
                        size='sm'
                        variant='flat'
                        onPress={onPreviousPage}
                    >
                        上一页
                    </Button>
                    <Button
                        isDisabled={pages === 1}
                        size='sm'
                        variant='flat'
                        onPress={onNextPage}
                    >
                        下一页
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
