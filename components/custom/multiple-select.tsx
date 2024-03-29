import { useState } from "react"

import * as adventurer from "@dicebear/adventurer"
import { createAvatar } from "@dicebear/core"
import { Avatar, Chip, Select, SelectedItems, SelectItem } from "@nextui-org/react"
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll"

import { useUserList } from "~/hooks/business/use-user-list"

interface MultipleSelectProps {
    column: Columns[0]
    details: any
    groupField: string
    userRole: "student" | "teacher"
    modifiedAttribute: (column: string, value: any) => void
}

export default function MultipleSelect({
    column,
    details,
    groupField,
    userRole,
    modifiedAttribute
}: MultipleSelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { items, hasMore, isLoading, onLoadMore } = useUserList({ userRole })

    const [, scrollerRef] = useInfiniteScroll({
        hasMore,
        isEnabled: isOpen,
        shouldUseLoader: false,
        onLoadMore
    })

    return (
        <Select
            isLoading={isLoading}
            items={details[groupField].concat(items)}
            key={column.uid}
            label={column.name}
            placeholder='请选择'
            selectionMode='multiple'
            variant='bordered'
            scrollRef={scrollerRef}
            onOpenChange={setIsOpen}
            isRequired={column.isRequired}
            renderValue={(items: SelectedItems<ApiUserManagement.SimpleUser>) => {
                return (
                    <div className='flex flex-wrap gap-1'>
                        {items.map((item) => (
                            <Chip key={item.key}>{item.data?.real_name}</Chip>
                        ))}
                    </div>
                )
            }}
            defaultSelectedKeys={details[groupField].map(
                (item: ApiUserManagement.SimpleUser) => item.id
            )}
            onSelectionChange={(value) => {
                modifiedAttribute(groupField, [...value])
            }}
        >
            {(user: ApiUserManagement.SimpleUser) => (
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
