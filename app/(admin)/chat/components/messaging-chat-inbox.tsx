import React from "react"

import {
    Badge,
    Card,
    CardBody,
    CardHeader,
    Listbox,
    ListboxItem,
    Tab,
    Tabs
} from "@nextui-org/react"

import DicebearAvatar from "@/components/common/avatar"
import { Col } from "@/components/common/dimension"
import Scrollbar from "@/components/common/scrollbar"
import { cn } from "~/utils"
import { useMessagingChatList, useSetRoomID } from "./data-provider"
import MessagingChatHeader from "./messaging-chat-header"
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

    const messagingChatList = useMessagingChatList()
    const setRoomID = useSetRoomID()

    return (
        <Card className={cn("h-[calc(100dvh-100px)] rounded-3xl lg:h-full", className)}>
            <CardHeader className='flex flex-col gap-2'>
                <MessagingChatHeader page={page} paginate={paginate} />
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
                        items={messagingChatList ?? []}
                        variant='flat'
                        onAction={setRoomID}
                    >
                        {(item) => (
                            <ListboxItem
                                key={item.id}
                                className='mb-2 px-4 data-[focus=true]:bg-default-100'
                                endContent={
                                    <div className='text-small text-default-400'>
                                        {item.time}
                                    </div>
                                }
                                textValue={item.name}
                                onPress={() => paginate?.(1)}
                            >
                                <div className='flex items-center gap-2 py-2'>
                                    {item.count == 0 ? (
                                        <DicebearAvatar
                                            alt={item.name}
                                            className='shrink-0'
                                            avatar={item.avatar}
                                        />
                                    ) : (
                                        <Badge color='danger' content={item.count}>
                                            <DicebearAvatar
                                                alt={item.name}
                                                className='shrink-0'
                                                avatar={item.avatar}
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
