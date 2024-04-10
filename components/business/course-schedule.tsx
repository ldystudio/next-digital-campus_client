"use client"

import { isWithinInterval, parseISO } from "date-fns"
import useSWR from "swr"
import { Card } from "@nextui-org/react"

import { request } from "~/service/request"
import { cn } from "~/utils"
import { createCircularIterator } from "~/utils/common/date"

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
    const colorArray = [
        "bg-default-500",
        "bg-blue-500",
        "bg-purple-500",
        "bg-green-500",
        "bg-red-500",
        "bg-pink-500",
        "bg-yellow-500",
        "bg-cyan-500",
        "bg-zinc-500"
    ]
    const nextColor = createCircularIterator(colorArray)

    const { data: courseData } = useSWR<ApiPage.Query<Course> | null>(
        `/course/schedule/`,
        fetcher,
        {
            revalidateOnFocus: false
        }
    )
    const rows = courseData?.results
        ? courseData?.results.map((course) => ({ ...course, color: nextColor() }))
        : []

    function doesUidExist(startTime: string, endTime: string, uid: number) {
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
                    className='col-span-8 row-span-2 grid grid-cols-8 gap-3 lg:gap-5'
                >
                    <Card className='col-span-1 grid grid-rows-2 place-items-center gap-3 rounded-lg text-center lg:gap-5 lg:rounded-3xl'>
                        <div>
                            <p className='font-bold italic'>{index + 1}</p>
                            <p className='text-default-500'>{timePoint.start_time}</p>
                            <p className='text-default-500'>{timePoint.end_time}</p>
                        </div>
                        <div>
                            <p className='font-bold italic'>{index + 2}</p>
                            <p className='text-default-500'>
                                {timePoints[index + 1].start_time}
                            </p>
                            <p className='text-default-500'>
                                {timePoints[index + 1].end_time}
                            </p>
                        </div>
                    </Card>
                    <Card className='col-span-7 grid grid-flow-col grid-cols-7 gap-3 rounded-lg text-center lg:gap-5 lg:rounded-3xl'>
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
                                        className={cn(
                                            "col-span-1 m-1 flex min-w-8 flex-col items-center justify-center rounded-lg bg-default-500 text-background lg:m-2 lg:rounded-3xl",
                                            row.color,
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
