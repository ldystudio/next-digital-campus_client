"use client"

import React, { useCallback } from "react"

import { Image } from "@nextui-org/react"

import DicebearAvatar from "@/components/common/avatar"
import { cn } from "~/utils"
import { MessagingChatMessages } from "./data-provider"

export interface MessagingChatMessageProps extends MessagingChatMessages {
    className?: string
}

export default function MessagingChatMessage({
    avatar,
    name,
    time,
    message,
    isRTL,
    imageUrl,
    className
}: MessagingChatMessageProps) {
    const messageRef = React.useRef<HTMLDivElement>(null)

    const MessageAvatar = useCallback(
        () => (
            <div className='relative flex-none'>
                <DicebearAvatar avatar={avatar} />
            </div>
        ),
        [avatar]
    )

    const Message = () => (
        <div className='flex w-full flex-col gap-4'>
            <div className='relative w-full rounded-medium bg-content2 px-4 py-3 text-default-600'>
                <div className='flex'>
                    <div className='w-full text-small font-semibold text-default-foreground'>
                        {name}
                    </div>
                    <div className='justify-end text-small text-default-400'>
                        {time}
                    </div>
                </div>
                <div ref={messageRef} className='mt-2 text-small text-default-900'>
                    {message}
                    {imageUrl && (
                        <Image
                            alt={`Image sent by ${name}`}
                            className='mt-2 border-2 border-default-200 shadow-small'
                            height={96}
                            src={imageUrl}
                            width={264}
                        />
                    )}
                </div>
            </div>
        </div>
    )

    return (
        <div className={cn("flex gap-3", { "flex-row-reverse": isRTL }, className)}>
            <MessageAvatar />
            <Message />
        </div>
    )
}
