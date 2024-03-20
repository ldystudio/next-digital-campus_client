import { useEffect, useState } from "react"

import { format } from "date-fns"
import { DayPicker } from "react-day-picker"
import { Icon } from "@iconify/react"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"

import "react-day-picker/dist/style.css"

interface DatePickerProps {
    dateStr: string
    column: string
    onDateChange: (key: string, value: string) => void
}

export default function DatePicker({ dateStr, column, onDateChange }: DatePickerProps) {
    const [date, setDate] = useState<Date>()

    useEffect(() => {
        if (dateStr) setDate(new Date(dateStr))
    }, [dateStr])

    return (
        <Popover>
            <PopoverTrigger>
                <Button
                    variant='bordered'
                    fullWidth
                    startContent={
                        <Icon
                            icon='solar:calendar-bold-duotone'
                            height='auto'
                            className='text-primary'
                        />
                    }
                >
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <DayPicker
                    mode='single'
                    captionLayout='dropdown-buttons'
                    fromYear={1990}
                    toYear={2050}
                    defaultMonth={date}
                    onSelect={(selectedDate) => {
                        setDate(selectedDate)
                        onDateChange(column, format(selectedDate as Date, "yyyy-MM-dd"))
                    }}
                />
            </PopoverContent>
        </Popover>
    )
}
