import { useState } from "react"

import _unionWith from "lodash/unionWith"
import * as adventurer from "@dicebear/adventurer"
import { createAvatar } from "@dicebear/core"
import { Avatar, Chip, Select, SelectedItems, SelectItem } from "@nextui-org/react"
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll"

import { useGroupList } from "~/hooks/business/use-group-list"

interface MultipleSelectProps {
    column: Columns[0]
    details: any
    groupField: string
    groupFetchUrl: string
    modifiedAttribute: (column: string, value: any) => void
}
export default function MultipleSelect({
    column,
    details,
    groupField,
    groupFetchUrl,
    modifiedAttribute
}: MultipleSelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { items, hasMore, isLoading, onLoadMore } = useGroupList({ groupFetchUrl })

    const [, scrollerRef] = useInfiniteScroll({
        hasMore,
        isEnabled: isOpen,
        shouldUseLoader: false,
        onLoadMore
    })

    switch (groupField) {
        case "class_name":
            return (
                <Select
                    isLoading={isLoading}
                    items={_unionWith(
                        [{ class_name: details[groupField], id: details.classes_id }],
                        items as Classes[],
                        (a, b) => a.id === b.id
                    )}
                    key={column.uid}
                    label={column.name}
                    placeholder='请选择'
                    selectionMode='single'
                    variant='bordered'
                    scrollRef={scrollerRef}
                    onOpenChange={setIsOpen}
                    isRequired={column.isRequired}
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
                </Select>
            )
        case "classes":
            return (
                <Select
                    isLoading={isLoading}
                    items={_unionWith(
                        details[groupField],
                        items as Classes[],
                        (a, b) => a.id === b.id
                    )}
                    key={column.uid}
                    label={column.name}
                    placeholder='请选择'
                    selectionMode='multiple'
                    variant='bordered'
                    scrollRef={scrollerRef}
                    onOpenChange={setIsOpen}
                    isRequired={column.isRequired}
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
                </Select>
            )
        default:
            return (
                <Select
                    isLoading={isLoading}
                    items={_unionWith(
                        details[groupField],
                        items as SimpleUser[],
                        (a, b) => a.id === b.id
                    )}
                    key={column.uid}
                    label={column.name}
                    placeholder='请选择'
                    selectionMode='multiple'
                    variant='bordered'
                    scrollRef={scrollerRef}
                    onOpenChange={setIsOpen}
                    isRequired={column.isRequired}
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
                </Select>
            )
    }
}
