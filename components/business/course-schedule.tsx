"use client"

import { Key, useCallback } from "react"

import { isWithinInterval, parseISO } from "date-fns"
import useSWR from "swr"
import { Card } from "@nextui-org/react"

import { request } from "~/service/request"
import { cn } from "~/utils"

interface CourseScheduleProps {
    timePoints: { uid: number; start_time: string; end_time: string }[]
}

type Course = {
    id: string
    teacher: {
        id: string
        real_name: string
        email: string
        avatar: string
    }[]
    classes: {
        id: string
        class_name: string
    }[]
    course_name: string
    course_description: string
    start_time: string
    end_time: string
    class_location: string
    credit: string
    course_type: number
    enrollment_limit: number
    weekday: number
    start_date: string
    end_date: string
    notes: string | null
}

const fetcher = (url: string) =>
    request.get<ApiPage.Query<any>>(url).then((res) => res.data)

export default function CourseSchedule({ timePoints }: CourseScheduleProps) {
    // const timePointsFormat = timePoints.map((item) => ({
    //     ...item,
    //     start_time: item.start_time.slice(0, 5),
    //     end_time: item.end_time.slice(0, 5)
    // }))

    const { data: courseData } = useSWR<ApiPage.Query<Course> | null>(
        `/course/schedule/`,
        fetcher,
        {
            revalidateOnFocus: false
        }
    )
    const rows = courseData?.results ?? []

    // function Cells({ cellValue, color }: { cellValue: string; color: string }) {
    //     return (
    //         <div className={cn(`rounded-md py-6 text-white`, color)}>{cellValue}</div>
    //     )
    // }

    // const renderCell = useCallback((rows: Course[], columnKey: Key) => {
    //     const cellValue = rows[columnKey as keyof Course]

    //     if (cellValue !== undefined) {
    //         switch (columnKey) {
    //             case "Monday":
    //                 return <Cells cellValue={cellValue} color='bg-blue-500' />
    //             case "Tuesday":
    //                 return <Cells cellValue={cellValue} color='bg-green-500' />
    //             case "Wednesday":
    //                 return <Cells cellValue={cellValue} color='bg-yellow-500' />
    //             case "Thursday":
    //                 return <Cells cellValue={cellValue} color='bg-purple-500' />
    //             case "Friday":
    //                 return <Cells cellValue={cellValue} color='bg-red-500' />
    //             case "Saturday":
    //                 return <Cells cellValue={cellValue} color='bg-gray-500' />
    //             case "Sunday":
    //                 return <Cells cellValue={cellValue} color='bg-gray-500' />
    //             default:
    //                 return cellValue
    //         }
    //     }
    // }, [])

    function doesUidExist(startTime: string, endTime: string, uid: number): boolean {
        for (const point of timePoints) {
            if (
                point.uid === uid &&
                point.start_time >= startTime.slice(0, 5) &&
                point.end_time <= endTime.slice(0, 5)
            ) {
                return true
            }
        }
        return false
    }

    return timePoints.map(
        (timePoint, index) =>
            index % 2 === 0 && (
                <div
                    key={timePoint.uid}
                    className='col-span-8 row-span-2 grid grid-cols-8 gap-5'
                >
                    <Card className='col-span-1 grid grid-rows-2 place-items-center gap-5 text-center'>
                        <div>
                            <p className='font-bold italic'>{timePoint.uid}</p>
                            <p className='text-default-500'>{timePoint.start_time}</p>
                            <p className='text-default-500'>{timePoint.end_time}</p>
                        </div>
                        <div>
                            <p className='font-bold italic'>
                                {timePoints[index + 1].uid}
                            </p>
                            <p className='text-default-500'>
                                {timePoints[index + 1].start_time}
                            </p>
                            <p className='text-default-500'>
                                {timePoints[index + 1].end_time}
                            </p>
                        </div>
                    </Card>
                    <Card className='col-span-7 grid grid-flow-col grid-cols-7 gap-5 text-center'>
                        {rows.map(
                            (row) =>
                                isWithinInterval(new Date(), {
                                    start: parseISO(row.start_date),
                                    end: parseISO(row.end_date)
                                }) &&
                                doesUidExist(
                                    row.start_time,
                                    row.end_time,
                                    timePoint.uid
                                ) && (
                                    <div
                                        key={row.id}
                                        // eslint-disable-next-line tailwindcss/no-custom-classname
                                        className={cn(
                                            "col-span-1 row-span-1 m-2 flex flex-col items-center justify-center rounded-xl bg-default-500 text-background *:truncate",
                                            row.weekday === 1
                                                ? "col-start-1"
                                                : row.weekday === 2
                                                  ? "col-start-2"
                                                  : row.weekday === 3
                                                    ? "col-start-3"
                                                    : row.weekday === 4
                                                      ? "col-start-4"
                                                      : row.weekday === 5
                                                        ? "col-start-5"
                                                        : row.weekday === 6
                                                          ? "col-start-6"
                                                          : "col-start-7"
                                        )}
                                    >
                                        <p>{row.course_name}</p>
                                        <p>{row.class_location}</p>
                                        <p>{row.credit}学分</p>
                                    </div>
                                )
                        )}
                    </Card>
                </div>
            )
    )
}
