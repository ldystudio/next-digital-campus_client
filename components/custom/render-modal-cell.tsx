import { Input, Radio, RadioGroup } from "@nextui-org/react"

import DatePicker from "@/components/business/date-picker"
import { Col } from "@/components/common"
import MultipleSelect from "@/components/custom/multiple-select"
import { isString } from "~/utils/common"

interface renderModalCellProps {
    modelColumns: Columns
    details: any
    dateFields: string[]
    statusOptions?: Columns
    modifiedAttribute: (column: string, value: any) => void
    statusField?: string
    disabledInput?: string[]
    groupField?: string
    userRole: "student" | "teacher"
}

export default function RenderModalCell({
    modelColumns,
    details,
    dateFields,
    statusOptions,
    modifiedAttribute,
    disabledInput,
    statusField,
    groupField,
    userRole
}: renderModalCellProps) {
    return modelColumns.map((column) => {
        if (dateFields.includes(column.uid)) {
            return (
                <Col key={column.uid} items='start'>
                    <p className='text-foreground-500'>
                        {column.name}
                        {column.isRequired && <span className='text-danger'> *</span>}
                    </p>
                    <DatePicker
                        dateStr={details[column.uid]}
                        column={column.uid}
                        onDateChange={modifiedAttribute}
                    />
                </Col>
            )
        }
        if (isString(statusField) && statusField === column.uid && statusOptions) {
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
                    classNames={{ wrapper: "justify-center" }}
                    isRequired={column.isRequired}
                >
                    {statusOptions.map((status) => (
                        <Radio key={status.uid} value={status.uid}>
                            {status.name}
                        </Radio>
                    ))}
                </RadioGroup>
            )
        }
        if (column.uid.includes("time")) {
            return (
                <>
                    <Input
                        key={column.uid}
                        type='time'
                        label={column.name}
                        variant='bordered'
                        defaultValue={details[column.uid]}
                        onValueChange={(value) => {
                            modifiedAttribute(column.uid, value)
                        }}
                        isRequired={column.isRequired}
                        list={
                            column.uid === "start_time"
                                ? "startTimeList"
                                : column.uid === "end_time"
                                  ? "endTimeList"
                                  : undefined
                        }
                    />
                    <datalist id='startTimeList'>
                        <option value='08:00' />
                        <option value='08:55' />
                        <option value='09:50' />
                        <option value='10:45' />
                        <option value='13:30' />
                        <option value='14:25' />
                        <option value='15:20' />
                        <option value='16:15' />
                    </datalist>
                    <datalist id='endTimeList'>
                        <option value='08:45' />
                        <option value='09:40' />
                        <option value='10:35' />
                        <option value='11:30' />
                        <option value='14:15' />
                        <option value='15:10' />
                        <option value='16:05' />
                        <option value='17:00' />
                    </datalist>
                </>
            )
        }
        if (groupField && groupField === column.uid) {
            return (
                <MultipleSelect
                    key={column.uid}
                    column={column}
                    details={details}
                    groupField={groupField}
                    userRole={userRole}
                    modifiedAttribute={modifiedAttribute}
                />
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
                        isRequired={column.isRequired}
                        isDisabled={disabledInput?.includes(column.uid)}
                    />
                )
        }
    })
}
