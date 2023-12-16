const Teacher: AuthRoute.Route = {
    name: "teacher",
    path: "/teacher",
    component: "basic",
    meta: {
        title: "教师管理",
        permissions: ["admin", "teacher", "student"],
        icon: "solar:users-group-rounded-bold",
        order: 30
    },
    children: [
        {
            name: "teacher_information",
            path: "/teacher/information",
            component: "self",
            meta: {
                title: "信息管理",
                icon: "solar:user-id-bold-duotone",
                order: 31
            }
        },
        {
            name: "teacher_work",
            path: "/teacher/work",
            component: "self",
            meta: {
                title: "工作安排",
                icon: "solar:checklist-minimalistic-bold-duotone",
                order: 32
            }
        },
        {
            name: "teacher_attendance",
            path: "/teacher/attendance",
            component: "self",
            meta: {
                title: "考勤管理",
                icon: "solar:clipboard-list-bold-duotone",
                order: 33
            }
        }
    ]
}

export default Teacher
