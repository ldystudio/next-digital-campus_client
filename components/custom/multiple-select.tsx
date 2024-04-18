import { ReactNode, useState } from "react"

import _unionWith from "lodash/unionWith"
import * as adventurer from "@dicebear/adventurer"
import { createAvatar } from "@dicebear/core"
import { Avatar } from "@nextui-org/avatar"
import { Chip } from "@nextui-org/chip"
import { Select, SelectedItems, SelectItem } from "@nextui-org/select"
import { Selection } from "@nextui-org/table"
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll"

import { useGroupList } from "~/hooks/business/use-group-list"
import { isObject } from "~/utils/common"

interface MultipleSelectProps {
    column: Columns[0]
    details: any
    groupField: string
    groupFetchUrl: string
    modifiedAttribute: (column: string, value: any) => void
}

interface GroupSelectProps {
    column: Columns[0]
    initItems: any[]
    groupFetchUrl: string
    selectionMode: "multiple" | "single"
    renderValue?: (items: SelectedItems<any>) => ReactNode
    defaultSelectedKeys?: string[]
    onSelectionChange: (keys: Selection) => any
    children: (item: any) => JSX.Element
}

function GroupSelect({
    column,
    initItems,
    groupFetchUrl,
    selectionMode,
    renderValue,
    defaultSelectedKeys,
    onSelectionChange,
    children
}: GroupSelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { items, hasMore, isLoading, onLoadMore } = useGroupList({ groupFetchUrl })

    const [, scrollerRef] = useInfiniteScroll({
        hasMore,
        isEnabled: isOpen,
        shouldUseLoader: false,
        onLoadMore
    })

    return (
        <Select
            isLoading={isLoading}
            items={_unionWith(initItems, items, (a, b) => a.id === b.id)}
            key={column.uid}
            label={column.name}
            labelPlacement='outside'
            placeholder={`请选择${column.name}`}
            selectionMode={selectionMode}
            variant='bordered'
            scrollRef={scrollerRef}
            onOpenChange={setIsOpen}
            isRequired={column.isRequired}
            renderValue={renderValue}
            defaultSelectedKeys={defaultSelectedKeys}
            onSelectionChange={onSelectionChange}
        >
            {children}
        </Select>
    )
}

export default function MultipleSelect({
    column,
    details,
    groupField,
    groupFetchUrl,
    modifiedAttribute
}: MultipleSelectProps) {
    switch (groupField) {
        case "course":
        case "student":
            return (
                <GroupSelect
                    column={column}
                    initItems={
                        isObject(details[groupField]) ? [details[groupField]] : []
                    }
                    groupFetchUrl={groupFetchUrl}
                    selectionMode='single'
                    defaultSelectedKeys={
                        isObject(details[groupField])
                            ? [details[groupField].id]
                            : undefined
                    }
                    onSelectionChange={(value) => {
                        modifiedAttribute(groupField, [...value][0])
                    }}
                >
                    {(item: any) => (
                        <SelectItem key={item.id} value={item.id}>
                            {groupField === "course"
                                ? item.course_name
                                : item.real_name}
                        </SelectItem>
                    )}
                </GroupSelect>
            )
        case "class_name":
            return (
                <GroupSelect
                    column={column}
                    initItems={[
                        { class_name: details[groupField], id: details.classes_id }
                    ]}
                    groupFetchUrl={groupFetchUrl}
                    selectionMode='single'
                    defaultSelectedKeys={[details.classes_id]}
                    onSelectionChange={(value) => {
                        modifiedAttribute("classes_id", [...value][0])
                    }}
                >
                    {(item: Classes) => (
                        <SelectItem key={item.id} value={item.id}>
                            {item.class_name}
                        </SelectItem>
                    )}
                </GroupSelect>
            )
        case "classes":
            return (
                <GroupSelect
                    column={column}
                    initItems={details[groupField]}
                    groupFetchUrl={groupFetchUrl}
                    selectionMode='multiple'
                    defaultSelectedKeys={details[groupField].map(
                        (item: SimpleUser) => item.id
                    )}
                    onSelectionChange={(value) => {
                        modifiedAttribute(groupField, [...value])
                    }}
                >
                    {(item: Classes) => (
                        <SelectItem key={item.id} value={item.id}>
                            {item.class_name}
                        </SelectItem>
                    )}
                </GroupSelect>
            )
        default:
            return (
                <GroupSelect
                    column={column}
                    initItems={details[groupField]}
                    groupFetchUrl={groupFetchUrl}
                    selectionMode='multiple'
                    renderValue={(items: SelectedItems<SimpleUser>) => {
                        return (
                            <div className='flex flex-wrap gap-1'>
                                {items.map((item) => (
                                    <Chip key={item.key}>{item.data?.real_name}</Chip>
                                ))}
                            </div>
                        )
                    }}
                    defaultSelectedKeys={details[groupField].map(
                        (item: SimpleUser) => item.id
                    )}
                    onSelectionChange={(value) => {
                        modifiedAttribute(groupField, [...value])
                    }}
                >
                    {(user: SimpleUser) => (
                        <SelectItem key={user.id} textValue={user.real_name}>
                            <div className='flex items-center gap-2'>
                                <Avatar
                                    alt={user.real_name}
                                    className='shrink-0'
                                    size='sm'
                                    src={createAvatar(adventurer, {
                                        seed: user.avatar
                                    }).toDataUriSync()}
                                />
                                <div className='flex flex-col'>
                                    <span className='text-small'>{user.real_name}</span>
                                    <span className='text-tiny text-default-400'>
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        </SelectItem>
                    )}
                </GroupSelect>
            )
    }
}
