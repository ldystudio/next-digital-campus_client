import React from "react"

import type { MessagingChatListProps } from "./messaging-chat-list"
import {
    Avatar,
    Badge,
    Card,
    CardBody,
    CardHeader,
    Listbox,
    ListboxItem,
    Tab,
    Tabs
} from "@nextui-org/react"

import { Col } from "@/components/common/dimension"
import Scrollbar from "@/components/common/scrollbar"
import { cn } from "~/utils"
import MessagingChatHeader from "./messaging-chat-header"
import messagingChatList from "./messaging-chat-list"
import MessagingChatSearch from "./messaging-chat-search"

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
    const [selectedKey, setSelectedKey] = React.useState<string | number>("private")

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
                <Col className='px-3 sm:px-6' space={4} fullWidth>
                    <MessagingChatSearch selectedKey={selectedKey} />
                    <Tabs
                        fullWidth
                        classNames={{
                            cursor: "group-data-[selected=true]:bg-content1"
                        }}
                        selectedKey={selectedKey}
                        onSelectionChange={setSelectedKey}
                    >
                        <Tab key='private' title='私聊' />
                        <Tab key='group' title='群聊' />
                    </Tabs>
                </Col>
            </CardHeader>

            <CardBody>
                <Scrollbar className='px-3'>
                    <Listbox
                        aria-label='ChatList'
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
