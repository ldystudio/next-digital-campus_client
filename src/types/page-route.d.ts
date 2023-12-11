declare namespace PageRoute {
    /**
     * the root route key
     * @translate 根路由
     */
    type RootRouteKey = "root"

    /**
     * the not found route, which catch the invalid route path
     * @translate 未找到路由(捕获无效路径的路由)
     */
    type NotFoundRouteKey = "not-found"

    /**
     * the route key
     * @translate 页面路由
     */
    type RouteKey =
        | "/"
        | "index"
        | "403"
        | "404"
        | "500"
        | "not-found"
        | "auth"
        | "auth_login"
        | "auth_register"
        | "about"
        | "dashboard"
        | "dashboard_analysis"
        | "dashboard_workbench"

    /**
     * last degree route key, which has the page file
     * @translate 最后一级路由(该级路有对应的页面文件)
     */
    type LastDegreeRouteKey = Extract<
        RouteKey,
        | "/"
        | "index"
        | "403"
        | "404"
        | "500"
        | "not-found"
        | "auth_login"
        | "auth_register"
        | "about"
        | "dashboard_analysis"
        | "dashboard_workbench"
    >
}
