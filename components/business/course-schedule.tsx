"use client"

import { Fragment, Key, useCallback } from "react"

import { format } from "date-fns"
import {
    Card,
    CardBody,
    getKeyValue,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react"

import { cn } from "~/utils"

interface CourseScheduleProps {
    columns: Columns
}

interface CellData {
    rowSpan?: number
    content: string | null
}
interface TimeSlot {
    time: string
    rows: (CellData | null)[][]
}

export default function CourseSchedule({ columns }: CourseScheduleProps) {
    const rows = [
        {
            id: "1",
            Monday: "Tony Reichert"
        },
        {
            id: "2",
            Monday: "Tony Reichert"
        },
        {
            id: "3",
            Tuesday: "Technical Lead"
        },
        {
            id: "4",
            Wednesday: "Senior Developer"
        },
        {
            id: "5",
            Thursday: "Community Manager"
        },
        {
            id: "6",
            Friday: "Project Manager"
        },
        {
            id: "7",
            Saturday: "Marketing Manager"
        },
        {
            id: "8",
            Sunday: "HR Manager"
        }
    ]
    type Rows = (typeof rows)[0]

    function Cells({ cellValue, color }: { cellValue: string; color: string }) {
        return (
            <div className={cn(`rounded-md py-6 text-white`, color)}>{cellValue}</div>
        )
    }

    const renderCell = useCallback((rows: Rows, columnKey: Key) => {
        const cellValue = rows[columnKey as keyof Rows]

        if (cellValue !== undefined) {
            switch (columnKey) {
                case "Monday":
                    return <Cells cellValue={cellValue} color='bg-blue-500' />
                case "Tuesday":
                    return <Cells cellValue={cellValue} color='bg-green-500' />
                case "Wednesday":
                    return <Cells cellValue={cellValue} color='bg-yellow-500' />
                case "Thursday":
                    return <Cells cellValue={cellValue} color='bg-purple-500' />
                case "Friday":
                    return <Cells cellValue={cellValue} color='bg-red-500' />
                case "Saturday":
                    return <Cells cellValue={cellValue} color='bg-gray-500' />
                case "Sunday":
                    return <Cells cellValue={cellValue} color='bg-gray-500' />
                default:
                    return cellValue
            }
        }
    }, [])

    const tableData: TimeSlot[] = [
        {
            time: "上午",
            rows: [
                [
                    { rowSpan: 4, content: "上午" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" }
                ],
                [
                    null,
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" }
                ],
                [
                    null,
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" }
                ],
                [
                    null,
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" }
                ]
            ]
        },
        {
            time: "下午",
            rows: [
                [
                    { rowSpan: 4, content: "下午" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" }
                ],
                [
                    null,
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" }
                ],
                [
                    null,
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" }
                ],
                [
                    null,
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" },
                    { content: "Content" }
                ]
            ]
        }
    ]

    return (
        <Card className='rounded-3xl lg:h-full'>
            <CardBody className='no-scrollbar'>
                <table className='w-full table-auto border-2 border-gray-200'>
                    <thead>
                        <tr className='text-center'>
                            {columns.map((column) => (
                                <th key={column.uid}>{column.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='*:text-center'>
                        {tableData.map((timeSlot, index) => (
                            <Fragment key={index}>
                                {timeSlot.rows.map((row, rowIndex) => (
                                    <tr
                                        key={`${index}-${rowIndex}`}
                                        className='*:border-2 *:border-gray-200  *:hover:bg-foreground-100'
                                    >
                                        {row.map((cell, cellIndex) => {
                                            if (!cell || !("rowSpan" in cell)) {
                                                return null // Skip generating <td> if it's not the first cell in the row and not the rowSpan cell
                                            }
                                            if (cell.rowSpan) {
                                                return (
                                                    <td
                                                        key={cellIndex}
                                                        rowSpan={cell.rowSpan}
                                                    >
                                                        {cell.content}
                                                    </td>
                                                )
                                            } else {
                                                return (
                                                    <td key={cellIndex}>
                                                        {cell.content}
                                                    </td>
                                                )
                                            }
                                        })}
                                    </tr>
                                ))}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    )
}
