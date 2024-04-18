"use client"

import { getLocalTimeZone, today } from "@internationalized/date"
import { Calendar } from "@nextui-org/calendar"
import { Card, CardBody, CardHeader } from "@nextui-org/card"

import TodoCard from "./todo-card"

export default function CalendarCard({ className }: PageComponentProps) {
    return (
        <Card className={className}>
            <CardHeader className='flex-col'>
                <p className='pb-3 font-bold'>日历</p>
                <Calendar
                    aria-label='Date (Uncontrolled)'
                    defaultValue={today(getLocalTimeZone())}
                    weekdayStyle='short'
                    // calendarWidth={300}
                    showShadow
                />
            </CardHeader>
            <CardBody>
                <TodoCard />
            </CardBody>
        </Card>
    )
}
