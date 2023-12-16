const Task: AuthRoute.Route = {
    name: "task",
    path: "/task",
    component: "basic",
    meta: {
        permissions: ["admin", "teacher", "student"],
        title: "作业管理",
        icon: "solar:notebook-bold-duotone",
        order: 70
    },
    children: [
        {
            name: "task_add",
            path: "/task/add",
            component: "self",
            meta: {
                title: "作业布置",
                icon: "solar:notebook-bookmark-bold-duotone",
                order: 71
            }
        },
        {
            name: "task_send",
            path: "/task/send",
            component: "self",
            meta: {
                title: "作业提交",
                icon: "solar:file-send-bold-duotone",
                order: 72
            }
        },
        {
            name: "task_correct",
            path: "/task/correct",
            component: "self",
            meta: {
                title: "作业批改",
                icon: "solar:gallery-edit-bold-duotone",
                order: 73
            }
        }
    ]
}

export default Task
