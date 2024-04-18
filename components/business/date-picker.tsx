import { useEffect, useState } from "react"

import { format } from "date-fns"
import { Icon } from "@iconify/react"
import {
    CalendarDate,
    getLocalTimeZone,
    parseDate,
    today
} from "@internationalized/date"
import { Button, ButtonProps } from "@nextui-org/button"
import {
    DatePicker as NextUiDatePicker,
    DatePickerProps as NextUiDatePickerProps
} from "@nextui-org/date-picker"
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover"

// import { DayPicker } from "react-day-picker"
// import "react-day-picker/dist/style.css"

interface DatePickerProps {
    dateStr: string
    column: string
    onDateChange: (key: string, value: string) => void
    isDisabled?: boolean
    variant?: NextUiDatePickerProps["variant"]
}

export default function DatePicker({
    dateStr,
    column,
    variant = "bordered",
    isDisabled,
    onDateChange
}: DatePickerProps) {
    // const [date, setDate] = useState<Date>()

    // useEffect(() => {
    //     if (dateStr) setDate(new Date(dateStr))
    // }, [dateStr])

    return (
        // <Popover>
        //     <PopoverTrigger>
        //         <Button
        //             variant={variant}
        //             fullWidth
        //             startContent={
        //                 <Icon
        //                     icon='solar:calendar-bold-duotone'
        //                     height='auto'
        //                     className='text-primary'
        //                 />
        //             }
        //             isDisabled={isDisabled}
        //         >
        //             {date ? format(date, "PPP") : <span>Pick a date</span>}
        //         </Button>
        //     </PopoverTrigger>
        //     <PopoverContent>
        //         <DayPicker
        //             mode='single'
        //             captionLayout='dropdown-buttons'
        //             fromYear={1990}
        //             toYear={2050}
        //             defaultMonth={date}
        //             onSelect={(selectedDate) => {
        //                 setDate(selectedDate)
        //                 onDateChange(column, format(selectedDate as Date, "yyyy-MM-dd"))
        //             }}
        //         />
        //     </PopoverContent>
        // </Popover>
        <NextUiDatePicker
            aria-label='Select a date'
            showMonthAndYearPickers
            variant={variant}
            isDisabled={isDisabled}
            defaultValue={dateStr ? parseDate(dateStr) : undefined}
            onChange={(date) => {
                console.log("date: ", date)
            }}
        />
    )
}
