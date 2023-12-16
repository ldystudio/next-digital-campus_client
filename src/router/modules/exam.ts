const Exam: AuthRoute.Route = {
    name: "exam",
    path: "/exam",
    component: "basic",
    meta: {
        title: "考试管理",
        permissions: ["admin", "teacher", "student"],
        icon: "solar:document-text-bold-duotone",
        order: 60
    },
    children: [
        {
            name: "exam_enter",
            path: "/exam/enter",
            component: "self",
            meta: {
                title: "考试安排",
                icon: "solar:document-medicine-bold-duotone",
                order: 61
            }
        },
        {
            name: "exam_score",
            path: "/exam/score",
            component: "self",
            meta: {
                title: "考试成绩管理",
                icon: "solar:explicit-bold-duotone",
                order: 62
            }
        },
        {
            name: "exam_query",
            path: "/exam/query",
            component: "self",
            meta: {
                title: "考试查询",
                icon: "solar:minimalistic-magnifer-bold-duotone",
                order: 63
            }
        }
    ]
}

export default Exam
