"use client"

import { useCallback, useState } from "react"

import constate from "constate"
import { useQuery } from "@tanstack/react-query"

import { getMessageDateTime } from "~/utils/common/date"

export type MessagingChatList = {
    id: number
    avatar: string
    name: string
    message: string
    count: number
    time: string | null
}

export interface MessagingChatMessages {
    avatar: string
    name: string
    time: string
    message: string
    isRTL?: boolean
    imageUrl?: string
    className?: string
}

function useDataState() {
    const [messagingChatConversations, setMessagingChatConversations] = useState<
        MessagingChatMessages[]
    >([])

    const { data: messagingChatList } = useQuery({
        queryKey: ["/chat/room/"],
        select: useCallback(
            (data: MessagingChatList[]) =>
                data.map((item) => ({
                    ...item,
                    time: item.time
                        ? getMessageDateTime(new Date(), new Date(item.time))
                        : null
                })),
            []
        )
    })
    
    return {
        messagingChatList,
        messagingChatConversations,
        setMessagingChatConversations
    }
}

export const [
    DataProvider,
    useMessagingChatList,
    useMessagingChatMessages,
    useSetMessagingChatMessages
] = constate(
    useDataState,
    (value) => value.messagingChatList,
    (value) => value.messagingChatConversations,
    (value) => value.setMessagingChatConversations
)
