const Student: AuthRoute.Route = {
    name: "student",
    path: "/student",
    component: "basic",
    meta: {
        title: "学生管理",
        permissions: ["admin", "teacher", "student"],
        icon: "solar:users-group-two-rounded-bold-duotone",
        order: 20
    },
    children: [
        {
            name: "student_information",
            path: "/student/information",
            component: "self",
            meta: {
                title: "信息管理",
                icon: "solar:user-id-bold-duotone",
                order: 21
            }
        },
        {
            name: "student_roll",
            path: "/student/roll",
            component: "self",
            meta: {
                title: "学籍管理",
                icon: "solar:clapperboard-text-bold-duotone",
                order: 22
            }
        },
        {
            name: "student_attendance",
            path: "/student/attendance",
            component: "self",
            meta: {
                title: "考勤管理",
                icon: "solar:user-id-bold-duotone",
                order: 23
            }
        }
    ]
}

export default Student
