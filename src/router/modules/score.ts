const Score: AuthRoute.Route = {
    name: "score",
    path: "/score",
    component: "basic",
    meta: {
        title: "成绩管理",
        permissions: ["admin", "teacher", "student"],
        icon: "solar:documents-bold-duotone",
        order: 50
    },
    children: [
        {
            name: "score_query",
            path: "/score/query",
            component: "self",
            meta: {
                title: "成绩查询",
                icon: "solar:minimalistic-magnifer-bold-duotone",
                order: 51
            }
        },
        {
            name: "score_statistics",
            path: "/score/statistics",
            component: "self",
            meta: {
                title: "成绩统计",
                icon: "solar:pie-chart-2-bold-duotone",
                order: 52
            }
        }
    ]
}

export default Score
