"use client"

import React from "react"

import { Icon } from "@iconify/react"
import { Button, Input, Tooltip } from "@nextui-org/react"
import { useQueryClient } from "@tanstack/react-query"

import { request } from "~/service/request"
import { useRoomID } from "./data-provider"

export default function MessagingChatInput() {
    const [message, setMessage] = React.useState<string>("")
    const roomID = useRoomID()

    const queryClient = useQueryClient()

    return (
        <Input
            aria-label='message'
            classNames={{
                innerWrapper: "items-center",
                label: "hidden",
                input: "py-0 text-medium",
                inputWrapper: "h-15 py-[10px]"
            }}
            endContent={
                <div className='flex'>
                    {!message && (
                        <Tooltip showArrow content='语音'>
                            <Button isIconOnly radius='full' variant='light'>
                                <Icon
                                    className='text-default-500'
                                    icon='solar:microphone-3-linear'
                                    width={24}
                                />
                            </Button>
                        </Tooltip>
                    )}
                    <Tooltip showArrow content='发送消息'>
                        <div className='flex h-10 flex-col justify-center'>
                            <Button
                                isIconOnly
                                className='h-[30px] w-[30px] min-w-[30px] bg-foreground leading-[30px]'
                                radius='lg'
                                onPress={async () => {
                                    const { error } = await request.post(
                                        "/chat/message/",
                                        {
                                            room_id: roomID,
                                            text: message
                                        }
                                    )
                                    if (!error) {
                                        setMessage("")
                                        queryClient.refetchQueries({
                                            queryKey: ["/chat/room/", roomID, "/"],
                                            type: "active",
                                            exact: true
                                        })
                                    }
                                }}
                            >
                                <Icon
                                    className='cursor-pointer text-default-50 [&>path]:stroke-[2px]'
                                    icon='solar:arrow-up-linear'
                                    width={20}
                                />
                            </Button>
                        </div>
                    </Tooltip>
                </div>
            }
            placeholder=''
            radius='lg'
            startContent={
                <Tooltip showArrow content='添加文件'>
                    <Button isIconOnly radius='full' variant='light'>
                        <Icon
                            className='text-default-500'
                            icon='solar:paperclip-linear'
                            width={20}
                        />
                    </Button>
                </Tooltip>
            }
            value={message}
            variant='bordered'
            onValueChange={setMessage}
        />
    )
}
