import React from "react"

import { Icon } from "@iconify/react"
import { Autocomplete, AutocompleteItem } from "@nextui-org/react"
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll"

import DicebearAvatar from "@/components/common/avatar"
import { useGroupList } from "~/hooks/business/use-group-list"
import { request } from "~/service/request"

interface MessagingChatSearchProps {
    selectedKey: string | number
}

export default function MessagingChatSearch({ selectedKey }: MessagingChatSearchProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [filterText, setFilterText] = React.useState("")

    const { items, hasMore, isLoading, onLoadMore } = useGroupList({
        groupFetchUrl: `/auth/simple/?real_name=${filterText}`
    })

    const [, scrollerRef] = useInfiniteScroll({
        hasMore,
        isEnabled: isOpen,
        shouldUseLoader: false,
        onLoadMore
    })

    return (
        <Autocomplete
            isLoading={isLoading}
            defaultItems={items as SimpleUser[]}
            scrollRef={scrollerRef}
            inputValue={filterText}
            aria-label='User Search'
            labelPlacement='outside'
            placeholder='查找用户...'
            radius='md'
            fullWidth
            startContent={
                <Icon
                    className='text-default-500 [&>g]:stroke-[2px]'
                    icon='solar:magnifer-linear'
                    width={18}
                />
            }
            variant='bordered'
            menuTrigger='input'
            onInputChange={setFilterText}
            onOpenChange={setIsOpen}
            onSelectionChange={async (id) => {
                const { data } = await request.post("/chat/room/", {
                    user_id: id,
                    type: selectedKey === "private" ? 1 : 2
                })
                console.log("data: ", data)
            }}
        >
            {(user) => (
                <AutocompleteItem key={user.id} textValue={user.real_name}>
                    <div className='flex items-center gap-2'>
                        <DicebearAvatar
                            alt={user.real_name}
                            className='shrink-0'
                            size='sm'
                            avatar={user.avatar}
                        />
                        <div className='flex flex-col'>
                            <span className='text-small'>{user.real_name}</span>
                            <span className='text-tiny text-default-400'>
                                {user.email}
                            </span>
                        </div>
                    </div>
                </AutocompleteItem>
            )}
        </Autocomplete>
    )
}
