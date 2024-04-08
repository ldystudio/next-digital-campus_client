import type { Metadata } from "next"
import clsx from "clsx"
import { Card } from "@nextui-org/react"

import CourseSchedule from "@/components/business/course-schedule"
import { getFormattedWeekDates } from "~/utils/common/date"

export const metadata: Metadata = {
    title: "课程表"
}

export default async function CourseTablePage() {
    const columns = [
        {
            uid: "Monday",
            name: "星期一"
        },
        {
            uid: "Tuesday",
            name: "星期二"
        },
        {
            uid: "Wednesday",
            name: "星期三"
        },
        {
            uid: "Thursday",
            name: "星期四"
        },
        {
            uid: "Friday",
            name: "星期五"
        },
        {
            uid: "Saturday",
            name: "星期六"
        },
        {
            uid: "Sunday",
            name: "星期日"
        }
    ]
    const timePoints = [
        {
            uid: 0,
            start_time: "08:00",
            end_time: "08:45"
        },
        {
            uid: 1,
            start_time: "08:55",
            end_time: "09:40"
        },
        {
            uid: 2,
            start_time: "09:50",
            end_time: "10:35"
        },
        {
            uid: 3,
            start_time: "10:45",
            end_time: "11:30"
        },
        {
            uid: 4,
            start_time: "13:30",
            end_time: "14:15"
        },
        {
            uid: 5,
            start_time: "14:25",
            end_time: "15:10"
        },
        {
            uid: 6,
            start_time: "15:20",
            end_time: "16:05"
        },
        {
            uid: 7,
            start_time: "16:15",
            end_time: "17:00"
        }
    ]

    const toWeekDates = getFormattedWeekDates()

    return (
        <section className='grid grid-flow-row-dense grid-cols-8 grid-rows-9 gap-3 text-xs *:h-full *:w-full lg:h-full lg:gap-5 lg:text-base'>
            <Card className='col-span-1 row-span-1 flex items-center justify-center rounded-lg lg:rounded-3xl'>
                <p>课程表</p>
            </Card>
            <Card className='col-span-7 row-span-1 grid grid-cols-7 place-items-center gap-1 rounded-lg text-center lg:gap-5 lg:rounded-3xl'>
                {columns.map((column, index) => (
                    <div key={column.uid} className='col-span-1'>
                        <p
                            className={clsx(
                                "font-bold",
                                toWeekDates[index] === "今天" && "text-primary"
                            )}
                        >
                            {column.name}
                        </p>
                        <p
                            className={clsx(
                                "text-default-500",
                                toWeekDates[index] === "今天" && "text-primary"
                            )}
                        >
                            {toWeekDates[index]}
                        </p>
                    </div>
                ))}
            </Card>
            <CourseSchedule timePoints={timePoints} />
        </section>
    )
}
