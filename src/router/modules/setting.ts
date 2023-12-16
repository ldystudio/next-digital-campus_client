const Setting: AuthRoute.Route = {
    name: "setting",
    path: "/setting",
    component: "self",
    meta: {
        singleLayout: "basic",
        permissions: ["admin", "teacher", "student"],
        title: "设置",
        icon: "solar:settings-bold-duotone",
        order: 900
    }
}

export default Setting
