"use client"

import { getLocalTimeZone, today } from "@internationalized/date"
import { Calendar, Card, CardBody, CardHeader } from "@nextui-org/react"
import { I18nProvider } from "@react-aria/i18n"

import TodoCard from "./todo-card"

export default function CalendarCard({ className }: PageComponentProps) {
    return (
        <Card className={className}>
            <CardHeader className='flex-col'>
                <p className='pb-3 font-bold'>日历</p>
                <I18nProvider locale='zh-CN-u-ca-chinese'>
                    <Calendar
                        aria-label='Date (Uncontrolled)'
                        defaultValue={today(getLocalTimeZone())}
                        weekdayStyle='short'
                        // calendarWidth={300}
                        showShadow
                    />
                </I18nProvider>
            </CardHeader>
            <CardBody>
                <TodoCard />
            </CardBody>
        </Card>
    )
}
