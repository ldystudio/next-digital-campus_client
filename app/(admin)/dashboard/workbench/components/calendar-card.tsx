"use client"

import { getLocalTimeZone, today } from "@internationalized/date"
import { Calendar, Card, CardBody, CardHeader } from "@nextui-org/react"

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
                    showShadow
                />
            </CardHeader>
            <CardBody>
                <TodoCard />
            </CardBody>
        </Card>
    )
}
