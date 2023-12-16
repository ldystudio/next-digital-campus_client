const Activity: AuthRoute.Route = {
    name: "activity",
    path: "/activity",
    component: "basic",
    meta: {
        permissions: ["admin", "teacher", "student"],
        title: "活动管理",
        icon: "solar:stars-bold-duotone",
        order: 90
    },
    children: [
        {
            name: "activity_release",
            path: "/activity/release",
            component: "self",
            meta: {
                title: "活动发布",
                icon: "solar:stars-line-bold-duotone",
                order: 91
            }
        },
        {
            name: "activity_enroll",
            path: "/activity/enroll",
            component: "self",
            meta: {
                title: "活动报名",
                icon: "solar:stars-minimalistic-bold-duotone",
                order: 92
            }
        },
        {
            name: "activity_achievement",
            path: "/activity/achievement",
            component: "self",
            meta: {
                title: "活动成果展示",
                icon: "solar:atom-bold-duotone",
                order: 93
            }
        }
    ]
}

export default Activity
