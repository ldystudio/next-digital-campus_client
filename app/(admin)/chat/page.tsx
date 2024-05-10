import type { Metadata } from "next"

import ChatApp from "./components/chat-app"

export const metadata: Metadata = {
    title: "在线聊天"
}

export default function ChatPage() {
    return (
        <section className='grid h-full grid-cols-12 gap-0 lg:h-full'>
            <ChatApp />
        </section>
    )
}
