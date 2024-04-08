const Course: AuthRoute.Route = {
    name: "course",
    path: "/course",
    component: "basic",
    meta: {
        permissions: ["admin", "teacher", "student"],
        title: "课程管理",
        icon: "solar:book-2-bold-duotone",
        order: 40
    },
    children: [
        {
            name: "course_setting",
            path: "/course/setting",
            component: "self",
            meta: {
                permissions: ["teacher"],
                title: "课程设置",
                icon: "solar:diploma-verified-bold-duotone",
                order: 41
            }
        },
        {
            name: "course_table",
            path: "/course/table",
            component: "self",
            meta: {
                title: "课程表",
                icon: "solar:document-bold-duotone",
                order: 42
            }
        },
        {
            name: "course_choose",
            path: "/course/choose",
            component: "self",
            meta: {
                permissions: ["student"],
                title: "选课管理",
                icon: "solar:bookmark-square-bold-duotone",
                order: 43
            }
        }
    ]
}

export default Course
