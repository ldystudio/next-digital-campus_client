const Learning: AuthRoute.Route = {
    name: "learning",
    path: "/learning",
    component: "basic",
    meta: {
        permissions: ["admin", "teacher", "student"],
        title: "在线学习",
        icon: "solar:colour-tuneing-bold-duotone",
        order: 110
    },
    children: [
        {
            name: "learning_classroom",
            path: "/learning/classroom",
            component: "self",
            meta: {
                title: "在线课堂",
                icon: "solar:presentation-graph-bold-duotone",
                order: 111
            }
        },
        {
            name: "learning_share",
            path: "/learning/share",
            component: "self",
            meta: {
                title: "学习资源分享",
                icon: "solar:share-bold-duotone",
                order: 112
            }
        },
        {
            name: "learning_discuss",
            path: "/learning/discuss",
            component: "self",
            meta: {
                title: "在线讨论",
                icon: "solar:user-speak-bold-duotone",
                order: 113
            }
        }
    ]
}

export default Learning
