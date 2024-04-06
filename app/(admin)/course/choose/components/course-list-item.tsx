"use client"

import React, { useMemo, useState } from "react"

import { Icon } from "@iconify/react"
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Image,
    Input,
    Pagination,
    Skeleton
} from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"

import { ChevronDownIcon, PlusIcon, SearchIcon } from "@/components/common"
import SingleSelection from "@/components/custom/single-selection"
import { useTableParams } from "~/hooks/business"
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
    console.log(props.id)

    return (
        <div
            className={cn(
                "relative flex w-full flex-none flex-col gap-3",
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
                        <div className='flex items-start justify-between gap-1'>
                            <h3 className='text-small font-medium text-default-700'>
                                {course_name}
                            </h3>
                            <div className='flex items-center gap-1'>
                                <span className='text-small text-default-500'>
                                    {choose_number}
                                </span>
                                <Icon
                                    className='text-default-500'
                                    icon='solar:user-heart-line-duotone'
                                    width={16}
                                />
                            </div>
                        </div>
                        {/* {description ? (
                                <p className='text-small text-default-500'>
                                    {description}
                                </p>
                            ) : null}
                            <p className='text-small font-medium text-default-500'>
                                ${price}
                            </p> */}
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
        selectedKeys,
        setSelectedKeys,
        visibleColumns,
        setVisibleColumns,
        statusFilter,
        setStatusFilter,
        rowsPerPage,
        sortDescriptor,
        setSortDescriptor,
        details,
        setDetails,
        modifiedDetails,
        setModifiedDetails,
        page,
        setPage,
        rows,
        pageData,
        headerColumns,
        pages,
        isLoading,
        findStatusName,
        mutate,
        finalUrl,
        onNextPage,
        onPreviousPage,
        onRowsPerPageChange,
        onSearchChange,
        onClear,
        modifiedAttribute,
        getOneFn,
        removeOneFn,
        updateOneFn,
        saveOneFn
    } = useTableParams({
        columns,
        url,
        selectedFilterKeys
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
                <Card className='grid h-full grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                    {(rows as unknown as CourseItem[])?.map((course) => (
                        <CourseListItem
                            key={course.id}
                            isLoading={isLoading}
                            {...course}
                        />
                    ))}
                </Card>
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
