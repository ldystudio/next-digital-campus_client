const Dashboard: AuthRoute.Route = {
    name: "dashboard",
    path: "/dashboard",
    component: "basic",
    meta: {
        title: "仪表盘",
        permissions: ["admin", "teacher", "student"],
        icon: "solar:chart-square-bold-duotone",
        order: 10
    },
    children: [
        {
            name: "dashboard_analysis",
            path: "/dashboard/analysis",
            component: "self",
            meta: {
                title: "分析页",
                icon: "solar:graph-new-bold-duotone",
                order: 11
            }
        },
        {
            name: "dashboard_workbench",
            path: "/dashboard/workbench",
            component: "self",
            meta: {
                title: "工作台",
                icon: "solar:calendar-bold-duotone",
                order: 12
            }
        }
    ]
}

export default Dashboard
