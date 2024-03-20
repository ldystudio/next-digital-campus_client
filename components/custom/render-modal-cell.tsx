import { Input, Radio, RadioGroup } from "@nextui-org/react"

import DatePicker from "@/components/business/date-picker"
import { Col } from "@/components/common"

interface renderModalCellProps {
    modelColumns: { uid: string; name: string; sortable?: boolean }[]
    details: any
    dateFields: string[]
    statusOptions: {
        uid: string
        name: string
    }[]
    modifiedAttribute: (column: string, value: any) => void
    statusField: string
}

export default function RenderModalCell({
    modelColumns,
    details,
    dateFields,
    statusOptions,
    modifiedAttribute,
    statusField
}: renderModalCellProps) {
    return modelColumns.map((column) => {
        if (dateFields.includes(column.uid)) {
            return (
                <Col key={column.uid} items='start'>
                    <p className='text-foreground-500'>{column.name}</p>
                    <DatePicker
                        dateStr={details[column.uid]}
                        column={column.uid}
                        onDateChange={modifiedAttribute}
                    />
                </Col>
            )
        }
        switch (column.uid) {
            case "id":
            case "actions":
                return null
            case "gender":
                return (
                    <RadioGroup
                        key={column.uid}
                        label={column.name}
                        color='primary'
                        orientation='horizontal'
                        defaultValue={`${details[column.uid]}`}
                        onValueChange={(value) => {
                            modifiedAttribute(column.uid, Number(value))
                        }}
                    >
                        <Radio value='1'>男</Radio>
                        <Radio value='2'>女</Radio>
                    </RadioGroup>
                )
            case statusField:
                return (
                    <RadioGroup
                        key={column.uid}
                        label={column.name}
                        color='primary'
                        orientation='horizontal'
                        defaultValue={`${details[column.uid]}`}
                        onValueChange={(value) => {
                            modifiedAttribute(column.uid, Number(value))
                        }}
                    >
                        {statusOptions.map((status) => (
                            <Radio key={status.uid} value={status.uid}>
                                {status.name}
                            </Radio>
                        ))}
                    </RadioGroup>
                )
            default:
                return (
                    <Input
                        key={column.uid}
                        label={column.name}
                        variant='bordered'
                        defaultValue={details[column.uid]}
                        onValueChange={(value) => {
                            modifiedAttribute(column.uid, value)
                        }}
                    />
                )
        }
    })
}
