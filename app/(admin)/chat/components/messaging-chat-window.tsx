import React from "react"

import { Icon } from "@iconify/react"
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    ScrollShadow
} from "@nextui-org/react"

import { cn } from "~/utils"
import { useMessagingChatConversations } from "./data-provider"
import MessagingChatHeader from "./messaging-chat-header"
import MessagingChatInput from "./messaging-chat-input"
import MessagingChatMessage from "./messaging-chat-message"

interface MessagingChatWindowProps {
    paginate?: (page: number) => void
    toggleMessagingProfileSidebar?: () => void
    className?: string
}

export default function MessagingChatWindow({
    paginate,
    toggleMessagingProfileSidebar,
    className
}: MessagingChatWindowProps) {
    const { messages, other_members } = useMessagingChatConversations() ?? {
        messages: [],
        other_members: {
            real_name: "",
            user_role: ""
        }
    }

    const scrollBarRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (scrollBarRef.current) {
            scrollBarRef.current.scrollTop = scrollBarRef.current.scrollHeight
        }
    }, [messages])

    return (
        <Card className={cn("h-[calc(100dvh-100px)] rounded-3xl lg:h-full", className)}>
            <CardHeader className='flex flex-col'>
                <MessagingChatHeader className='flex lg:hidden' paginate={paginate} />
                <div className='flex h-16 w-full items-center gap-2 border-y-small border-default-200 p-3 sm:p-4 lg:border-t-0'>
                    <div className='w-full'>
                        <div className='text-small font-semibold'>
                            {other_members.real_name}
                        </div>
                        <div className='mt-1 text-small text-default-500'>
                            {other_members.user_role}
                        </div>
                    </div>
                    <div className='flex cursor-pointer justify-end'>
                        <Dropdown placement='bottom-end'>
                            <DropdownTrigger>
                                <Button
                                    isIconOnly
                                    className='min-w-6 text-default-500'
                                    variant='light'
                                >
                                    <Icon icon='solar:menu-dots-bold' width={24} />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                onAction={(key: React.Key) => {
                                    if (key === "view_profile") {
                                        if (toggleMessagingProfileSidebar) {
                                            toggleMessagingProfileSidebar()
                                        } else {
                                            paginate?.(1)
                                        }
                                    }
                                }}
                            >
                                <DropdownItem key='view_profile' className='xl:hidden'>
                                    View Profile
                                </DropdownItem>
                                <DropdownItem key='mark_as_spam'>
                                    Mark as spam
                                </DropdownItem>
                                <DropdownItem key='delete' className='text-danger'>
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </CardHeader>

            <CardBody>
                <ScrollShadow
                    ref={scrollBarRef}
                    className='flex max-h-[calc(100vh-220px)] flex-col gap-6 px-6 py-4 lg:max-h-[calc(100vh-162px)]'
                    hideScrollBar
                >
                    {messages.map((messagingChatConversation, idx) => (
                        <MessagingChatMessage
                            key={idx}
                            {...messagingChatConversation}
                        />
                    ))}
                </ScrollShadow>
            </CardBody>

            <CardFooter className='mb-1 lg:mb-[6px]'>
                <MessagingChatInput />
            </CardFooter>
        </Card>
    )
}
