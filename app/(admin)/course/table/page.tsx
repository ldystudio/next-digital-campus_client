import type { Metadata } from "next"
import clsx from "clsx"
import { Card, CardBody } from "@nextui-org/react"

import CourseSchedule from "@/components/business/course-schedule"
import getFormattedWeekDates from "~/utils/common/date"

export const metadata: Metadata = {
    title: "课程表管理"
}

export default function CourseTablePage() {
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
    const toWeekDates = getFormattedWeekDates()

    return (
        <section className='grid grid-flow-row-dense grid-cols-8 grid-rows-9 *:h-full *:w-full *:rounded-3xl lg:h-full lg:gap-5'>
            {/* <CourseSchedule columns={columns} /> */}
            <Card className='col-span-1 row-span-1 flex items-center justify-center'>
                <p>
                    第<span className='font-bold italic'> 1 </span>周
                </p>
            </Card>
            <Card className='col-span-7 row-span-1 grid grid-cols-7 place-items-center gap-5 text-center'>
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
            <Card className='col-span-1 row-span-2 grid grid-rows-2 place-items-center gap-5 text-center'>
                <div>
                    <p className='font-bold italic'>1</p>
                    <p className='text-default-500'>08:00</p>
                    <p className='text-default-500'>08:45</p>
                </div>
                <div>
                    <p className='font-bold italic'>2</p>
                    <p className='text-default-500'>08:55</p>
                    <p className='text-default-500'>09:40</p>
                </div>
            </Card>
            <Card className='col-span-7 row-span-2 grid grid-cols-7 place-items-center gap-5 text-center'>
                <Card className='col-start-6 h-full w-full bg-default-500'></Card>
                <Card className='col-start-7 h-full w-full bg-primary-500'></Card>
            </Card>
            <Card className='col-span-1 row-span-2 grid grid-rows-2 place-items-center gap-5 text-center'>
                <div>
                    <p className='font-bold italic'>3</p>
                    <p className='text-default-500'>09:50</p>
                    <p className='text-default-500'>10:45</p>
                </div>
                <div>
                    <p className='font-bold italic'>4</p>
                    <p className='text-default-500'>10:50</p>
                    <p className='text-default-500'>11:35</p>
                </div>
            </Card>
            <Card className='col-span-7 row-span-2'>6</Card>
            <Card className='col-span-1 row-span-2 grid grid-rows-2 place-items-center gap-5 text-center'>
                <div>
                    <p className='font-bold italic'>5</p>
                    <p className='text-default-500'>13:30</p>
                    <p className='text-default-500'>14:15</p>
                </div>
                <div>
                    <p className='font-bold italic'>6</p>
                    <p className='text-default-500'>14:25</p>
                    <p className='text-default-500'>15:10</p>
                </div>
            </Card>
            <Card className='col-span-7 row-span-2'>8</Card>
            <Card className='col-span-1 row-span-2 grid grid-rows-2 place-items-center gap-5 text-center'>
                <div>
                    <p className='font-bold italic'>7</p>
                    <p className='text-default-500'>15:20</p>
                    <p className='text-default-500'>16:05</p>
                </div>
                <div>
                    <p className='font-bold italic'>8</p>
                    <p className='text-default-500'>16:15</p>
                    <p className='text-default-500'>17:00</p>
                </div>
            </Card>
            <Card className='col-span-7 row-span-2'>10</Card>
        </section>
    )
}
