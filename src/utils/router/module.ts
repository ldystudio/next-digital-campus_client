/**
 * 权限路由排序
 * @param routes - 权限路由
 */
export function sortRoutes(routes: AuthRoute.Route[]) {
    return routes
        .sort((next, pre) => Number(next.meta?.order) - Number(pre.meta?.order))
        .map((i) => {
            if (i.children) sortRoutes(i.children)
            return i
        })
}
