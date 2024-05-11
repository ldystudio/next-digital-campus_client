import React from "react"

import type { MessagingChatListProps } from "./messaging-chat-list"
import { Icon } from "@iconify/react"
import {
    Avatar,
    Badge,
    Card,
    CardBody,
    CardHeader,
    Input,
    Listbox,
    ListboxItem,
    Tab,
    Tabs
} from "@nextui-org/react"

import Scrollbar from "@/components/common/scrollbar"
import { cn } from "~/utils"
import MessagingChatHeader from "./messaging-chat-header"
import messagingChatList from "./messaging-chat-list"

interface MessageChatInboxProps {
    page?: number
    paginate?: (direction: number) => void
    className?: string
}

export default function MessageChatInbox({
    page,
    paginate,
    className
}: MessageChatInboxProps) {
    return (
        <Card
            className={cn("h-full max-h-[calc(100dvh-100px)] rounded-3xl", className)}
        >
            <CardHeader className='flex flex-col gap-2'>
                <MessagingChatHeader
                    // className='hidden sm:flex'
                    page={page}
                    paginate={paginate}
                />
                <div className='flex w-full flex-col gap-4 px-3 sm:px-6 '>
                    <div>
                        <div className='mb-4 lg:mb-4'>
                            <Input
                                aria-label='Search'
                                labelPlacement='outside'
                                placeholder='Search...'
                                radius='md'
                                startContent={
                                    <Icon
                                        className='text-default-500 [&>g]:stroke-[2px]'
                                        icon='solar:magnifer-linear'
                                        width={18}
                                    />
                                }
                                variant='bordered'
                            />
                        </div>
                        <div className='mt-4'>
                            <Tabs
                                fullWidth
                                classNames={{
                                    cursor: "group-data-[selected=true]:bg-content1"
                                }}
                            >
                                <Tab key='inbox' title='Inbox' />
                                <Tab key='unread' title='Unread' />
                            </Tabs>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardBody>
                <Scrollbar className='px-3'>
                    <Listbox
                        classNames={{
                            base: "p-0"
                        }}
                        items={messagingChatList}
                        variant='flat'
                    >
                        {(item: MessagingChatListProps) => (
                            <ListboxItem
                                key={item.id}
                                className={cn("mb-2 px-4", {
                                    "bg-default-100": item.active
                                })}
                                endContent={
                                    <div className='text-small text-default-400'>
                                        {item.time}
                                    </div>
                                }
                                textValue={item.name}
                                onPress={() => paginate?.(1)}
                            >
                                <div className='flex items-center gap-2 py-1'>
                                    {item.count == 0 ? (
                                        <Avatar
                                            alt={item.name}
                                            className='shrink-0'
                                            size='sm'
                                            src={item.avatar}
                                        />
                                    ) : (
                                        <Badge color='danger' content={item.count}>
                                            <Avatar
                                                alt={item.name}
                                                className='shrink-0'
                                                size='sm'
                                                src={item.avatar}
                                            />
                                        </Badge>
                                    )}
                                    <div className='ml-2 min-w-0 flex-1'>
                                        <div className='text-small font-semibold text-default-foreground'>
                                            {item.name}
                                        </div>
                                        <div className='truncate text-small text-default-500'>
                                            {item.message}
                                        </div>
                                    </div>
                                </div>
                            </ListboxItem>
                        )}
                    </Listbox>
                </Scrollbar>
            </CardBody>
        </Card>
    )
}
