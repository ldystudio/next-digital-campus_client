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

export type MessagingChatMessages = {
    avatar: string
    name: string
    time: string | null
    message: string
    isRTL?: boolean
    imageUrl?: string
}

export type MessagingChatConversations = {
    messages: MessagingChatMessages[]
    other_members: {
        real_name: string
        user_role: string
    }
}

function useQueryMessagingChatList(url: string) {
    return useQuery({
        queryKey: [url],
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
}

function useQueryMessagingChatConversations(url: string, roomID: string | number) {
    return useQuery({
        queryKey: [url, roomID, "/"],
        select: useCallback(
            (data: MessagingChatConversations) => ({
                ...data,
                messages: data.messages.map((message) => ({
                    ...message,
                    time: message.time
                        ? getMessageDateTime(new Date(), new Date(message.time))
                        : null
                }))
            }),
            []
        ),
        enabled: roomID !== ""
    })
}

function useDataState() {
    const [roomID, setRoomID] = useState<string | number>("")

    const privateChatURL = "/chat/room/"
    const { data: messagingChatList } = useQueryMessagingChatList(privateChatURL)
    const { data: messagingChatConversations } = useQueryMessagingChatConversations(
        privateChatURL,
        roomID
    )

    return {
        messagingChatList,
        messagingChatConversations,
        roomID,
        setRoomID
    }
}

export const [
    DataProvider,
    useMessagingChatList,
    useMessagingChatConversations,
    useRoomID,
    useSetRoomID
] = constate(
    useDataState,
    (value) => value.messagingChatList,
    (value) => value.messagingChatConversations,
    (value) => value.roomID,
    (value) => value.setRoomID
)
