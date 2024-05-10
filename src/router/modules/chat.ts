const Chat: AuthRoute.Route = {
    name: "chat",
    path: "/chat",
    component: "self",
    meta: {
        title: "在线聊天",
        singleLayout: "basic",
        permissions: ["admin", "teacher", "student"],
        icon: "solar:chat-round-dots-bold-duotone",
        order: 800
    }
}

export default Chat
