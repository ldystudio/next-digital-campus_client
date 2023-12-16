const Notice: AuthRoute.Route = {
    name: "notice",
    path: "/notice",
    component: "basic",
    meta: {
        title: "通知通告",
        icon: "solar:chat-line-bold-duotone",
        order: 200
    },
    children: [
        {
            name: "notice_school",
            path: "/notice/school",
            component: "self",
            meta: {
                title: "学校通知",
                icon: "solar:letter-opened-bold-duotone",
                order: 201
            }
        },
        {
            name: "notice_class",
            path: "/notice/class",
            component: "self",
            meta: {
                title: "班级通知",
                icon: "solar:letter-unread-bold-duotone",
                order: 202
            }
        },
        {
            name: "notice_person",
            path: "/notice/person",
            component: "self",
            meta: {
                title: "个人消息通知",
                icon: "solar:chat-square-call-bold-duotone",
                order: 203
            }
        }
    ]
}

export default Notice
