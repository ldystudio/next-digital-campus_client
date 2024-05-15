"use client"

import { useCallback, useState } from "react"

import constate from "constate"
import { getCookie } from "cookies-next"
import useWebSocket, { ReadyState } from "react-use-websocket"
import { useQuery } from "@tanstack/react-query"

import { getAuthState } from "~/store"
import { getMessageDateTime } from "~/utils/common/date"

export type MessagingChatList = {
    id: string
    avatar: string
    name: string
    message: string
    count: number
    time: string | null
}

export type MessagingChatUser = {
    real_name: string
    user_role: string
}

export type MessagingChatMessageList = {
    userId: string
    avatar: string
    name: string
    time: string | null
    message: string
    isRTL?: boolean
    imageUrl?: string
}

export type MessagingChatConversations = {
    messages: MessagingChatMessageList[]
    other_members: {
        real_name: string
        user_role: string
    }
}

type ActionType =
    | "join_room"
    | "leave_room"
    | "create_message"
    | "read_message"
    | "retrieve"
    | "subscribe_to_messages_in_room"
    | "subscribe_instance"

type SendActionMessageParams = {
    action: ActionType
    [key: string]: any
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

function useDataState() {
    const [roomID, setRoomID] = useState<string | number>("")
    const [messagingChatUser, setMessagingChatUser] = useState<MessagingChatUser>({
        real_name: "",
        user_role: ""
    })
    const [messagingChatMessageList, setMessagingChatMessageList] = useState<
        MessagingChatMessageList[]
    >([])

    const privateChatURL = "/chat/room/"
    const { data: messagingChatList } = useQueryMessagingChatList(privateChatURL)

    const { userInfo, requestId } = getAuthState()

    // prettier-ignore
    const BACKEND_HOST = process.env.BACKEND_URL?.replace(/^https?:\/\//, "").replace(/\/.*$/, "")
    const { sendJsonMessage, readyState } = useWebSocket(
        `ws://${BACKEND_HOST}/ws/chat/room/?token=${getCookie("accessToken")}`,
        {
            onOpen: () => console.log("WebSocket Successfully Connected"),
            onMessage: (event) => {
                const data = JSON.parse(event.data)
                switch (data.action) {
                    case "create":
                        setMessagingChatMessageList([
                            ...messagingChatMessageList,
                            selectMessagingChatMessageList(data.data)
                        ])
                        break
                    case "retrieve":
                        setMessagingChatMessageList(
                            data.data.messages.map(
                                (message: MessagingChatMessageList) =>
                                    selectMessagingChatMessageList(message)
                            )
                        )
                        setMessagingChatUser(data.data.other_members)
                        break
                }
            }
        }
    )

    const connectionStatus = {
        [ReadyState.CONNECTING]: "Connecting",
        [ReadyState.OPEN]: "Open",
        [ReadyState.CLOSING]: "Closing",
        [ReadyState.CLOSED]: "Closed",
        [ReadyState.UNINSTANTIATED]: "Uninspired"
    }[readyState]

    function sendActionMessage({ action, ...args }: SendActionMessageParams) {
        sendJsonMessage({
            pk: roomID,
            action: action,
            request_id: requestId,
            ...args
        })
    }

    function selectMessagingChatMessageList(message: MessagingChatMessageList) {
        return {
            ...message,
            time: message.time
                ? getMessageDateTime(new Date(), new Date(message.time))
                : null,
            isRTL: message.userId === userInfo.userId
        }
    }

    return {
        messagingChatList,
        messagingChatUser,
        messagingChatMessageList,
        roomID,
        setRoomID,
        connectionStatus,
        sendActionMessage
    }
}

export const [
    DataProvider,
    useMessagingChatList,
    useMessagingChatUser,
    useMessagingChatMessageList,
    useRoomID,
    useSetRoomID,
    useConnectionStatus,
    useSendActionMessage
] = constate(
    useDataState,
    (value) => value.messagingChatList,
    (value) => value.messagingChatUser,
    (value) => value.messagingChatMessageList,
    (value) => value.roomID,
    (value) => value.setRoomID,
    (value) => value.connectionStatus,
    (value) => value.sendActionMessage
)
