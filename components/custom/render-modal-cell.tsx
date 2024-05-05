import React from "react"

import { parseDate, parseTime } from "@internationalized/date"
import {
    DatePicker,
    Input,
    Radio,
    RadioGroup,
    Select,
    SelectItem,
    Textarea,
    TimeInput
} from "@nextui-org/react"

import UploadBox from "@/components/common/upload-box"
import MultipleSelect from "@/components/custom/multiple-select"
import { isIncludeSubstring, isString } from "~/utils/common"

interface renderModalCellProps {
    url: string
    modelColumns: Columns
    details: any
    dateFields: string[]
    statusOptions?: Columns
    modifiedDetails: any
    modifiedAttribute: (column: string, value: any) => void
    statusField?: string
    disabledInput?: string[]
    groupField?: string
    groupFetchUrl?: string
}

export default function RenderModalCell({
    url,
    modelColumns,
    details,
    dateFields,
    statusOptions,
    modifiedDetails,
    modifiedAttribute,
    disabledInput,
    statusField,
    groupField,
    groupFetchUrl = ""
}: renderModalCellProps) {
    const timeList = {
        startTimeList: [
            { value: "08:00:00", label: "08:00" },
            { value: "08:55:00", label: "08:55" },
            { value: "09:50:00", label: "09:50" },
            { value: "10:45:00", label: "10:45" },
            { value: "13:30:00", label: "13:30" },
            { value: "14:25:00", label: "14:25" },
            { value: "15:20:00", label: "15:20" },
            { value: "16:15:00", label: "16:15" }
        ],
        endTimeList: [
            { value: "08:45:00", label: "08:45" },
            { value: "09:40:00", label: "09:40" },
            { value: "10:35:00", label: "10:35" },
            { value: "11:30:00", label: "11:30" },
            { value: "14:15:00", label: "14:15" },
            { value: "15:10:00", label: "15:10" },
            { value: "16:05:00", label: "16:05" },
            { value: "17:00:00", label: "17:00" }
        ]
    }

    return modelColumns.map((column) => {
        if (column.uid.includes("picture")) {
            return (
                <UploadBox
                    key={column.uid}
                    label={column.name}
                    fileField={column.uid}
                    fileName={
                        details[column.uid]
                            ? details[column.uid].split("/").pop()
                            : undefined
                    }
                    uploadUrl={url}
                    entityId={modifiedDetails.id}
                />
            )
        }
        if (dateFields.includes(column.uid)) {
            const date = details[column.uid]?.split("T")[0]
            return (
                !disabledInput?.includes(column.uid) && (
                    <DatePicker
                        key={column.uid}
                        label={column.name}
                        labelPlacement='outside'
                        variant='bordered'
                        defaultValue={date ? parseDate(date) : undefined}
                        showMonthAndYearPickers
                        isRequired={column.isRequired}
                        onChange={(date) => {
                            modifiedAttribute(column.uid, date.toString())
                        }}
                    />
                )
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
        if (isIncludeSubstring(column.uid, ["start_time", "end_time"])) {
            return (
                !disabledInput?.includes(column.uid) && (
                    <Select
                        key={column.uid}
                        items={
                            column.uid === "start_time"
                                ? timeList.startTimeList
                                : column.uid === "end_time"
                                  ? timeList.endTimeList
                                  : []
                        }
                        label={column.name}
                        labelPlacement='outside'
                        placeholder='请选择时间'
                        variant='bordered'
                        defaultSelectedKeys={
                            details[column.uid] ? [details[column.uid]] : undefined
                        }
                        onSelectionChange={(value) => {
                            modifiedAttribute(column.uid, [...value][0])
                        }}
                        isRequired={column.isRequired}
                    >
                        {(time) => (
                            <SelectItem key={time.value}>{time.label}</SelectItem>
                        )}
                    </Select>
                )
            )
        }
        if (column.uid.includes("time")) {
            return (
                <TimeInput
                    key={column.uid}
                    label={column.name}
                    labelPlacement='outside'
                    placeholder='请输入时间'
                    variant='bordered'
                    hourCycle={24}
                    granularity='second'
                    isRequired={column.isRequired}
                    defaultValue={
                        details[column.uid] ? parseTime(details[column.uid]) : undefined
                    }
                    onChange={(value) => {
                        modifiedAttribute(column.uid, value.toString())
                    }}
                />
            )
        }
        if (groupField && groupField === column.uid) {
            return (
                <MultipleSelect
                    key={column.uid}
                    column={column}
                    details={details}
                    groupField={groupField}
                    groupFetchUrl={groupFetchUrl}
                    modifiedAttribute={modifiedAttribute}
                />
            )
        }
        if (isIncludeSubstring(column.uid, ["description", "notes"])) {
            return (
                !disabledInput?.includes(column.uid) && (
                    <Textarea
                        key={column.uid}
                        label={column.name}
                        labelPlacement='outside'
                        variant='bordered'
                        defaultValue={details[column.uid]}
                        onValueChange={(value) => {
                            modifiedAttribute(column.uid, value)
                        }}
                        isRequired={column.isRequired}
                    />
                )
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
            case "class_name":
            case "classes":
                return (
                    <MultipleSelect
                        key={column.uid}
                        column={column}
                        details={details}
                        groupField={column.uid}
                        groupFetchUrl='/classes/information/'
                        modifiedAttribute={modifiedAttribute}
                    />
                )
            case "course":
            case "student":
                return (
                    <MultipleSelect
                        key={column.uid}
                        column={column}
                        details={details}
                        groupField={column.uid}
                        groupFetchUrl={`/${column.uid}/simple/`}
                        modifiedAttribute={modifiedAttribute}
                    />
                )
            default:
                return (
                    !disabledInput?.includes(column.uid) && (
                        <Input
                            key={column.uid}
                            label={column.name}
                            labelPlacement='outside'
                            placeholder={`请输入${column.name}`}
                            type={
                                typeof details[column.uid] === "number"
                                    ? "number"
                                    : "text"
                            }
                            variant='bordered'
                            defaultValue={details[column.uid]}
                            onValueChange={(value) => {
                                modifiedAttribute(column.uid, value)
                            }}
                            isRequired={column.isRequired}
                        />
                    )
                )
        }
    })
}
