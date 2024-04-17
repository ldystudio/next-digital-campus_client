"use client"

import { useState } from "react"

import { Card, CardBody } from "@nextui-org/react"

import { Calendar } from "@/components/ui/calendar"
import TodoCard from "./todo-card"

export default function CalendarCard({ className }: PageComponentProps) {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <Card className={className}>
            <CardBody>
                {/* <Calendar
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    className='flex justify-center rounded-3xl border shadow'
                /> */}
                <TodoCard />
            </CardBody>
        </Card>
    )
}
