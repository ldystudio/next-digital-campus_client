const Class: AuthRoute.Route = {
    name: "class",
    path: "/class",
    component: "basic",
    meta: {
        permissions: ["admin", "teacher"],
        title: "班级管理",
        icon: "solar:buildings-2-bold-duotone",
        order: 100
    },
    children: [
        {
            name: "class_member",
            path: "/class/member",
            component: "self",
            meta: {
                permissions: ["admin", "teacher"],
                title: "班级成员管理",
                icon: "solar:user-bold",
                order: 101
            }
        },
        {
            name: "class_forum",
            path: "/class/forum",
            component: "self",
            meta: {
                title: "班级论坛",
                icon: "solar:subtitles-bold-duotone",
                order: 102
            }
        },
        {
            name: "class_photo",
            path: "/class/photo",
            component: "self",
            meta: {
                title: "班级相册",
                icon: "solar:gallery-bold-duotone",
                order: 103
            }
        }
    ]
}

export default Class
