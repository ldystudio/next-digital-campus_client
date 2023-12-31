/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * 将权限路由转换成搜索的菜单数据
 * @param routes - 权限路由
 * @param treeMap
 */
export function transformAuthRouteToSearchMenus(
    routes: AuthRoute.Route[],
    treeMap: AuthRoute.Route[] = []
) {
    if (routes && routes.length === 0) return []
    return routes.reduce((acc, cur) => {
        acc.push(cur)
        if (cur.children && cur.children.length > 0) {
            transformAuthRouteToSearchMenus(cur.children, treeMap)
        }
        return acc
    }, treeMap)
}

/** 将路由名字转换成路由路径 */
export function transformRouteNameToRoutePath(
    name: Exclude<AuthRoute.AllRouteKey, "not-found">
): AuthRoute.RoutePath {
    const rootPath: AuthRoute.RoutePath = "/"
    if (name === "root") return rootPath

    const splitMark = "_"
    const pathSplitMark = "/"
    const path = name.split(splitMark).join(pathSplitMark)

    return (pathSplitMark + path) as AuthRoute.RoutePath
}

/** 将路由路径转换成路由名字 */
export function transformRoutePathToRouteName<K extends AuthRoute.RoutePath>(path: K) {
    if (path === "/") return "root"

    const pathSplitMark = "/"
    const routeSplitMark = "_"

    const name = path
        .split(pathSplitMark)
        .slice(1)
        .join(routeSplitMark) as AuthRoute.AllRouteKey

    return name
}

/**
 * 是否有外链
 * @param item - 权限路由
 */
function hasHref(item: AuthRoute.Route) {
    return Boolean(item.meta.href)
}

/**
 * 是否有路由组件
 * @param item - 权限路由
 */
function hasComponent(item: AuthRoute.Route) {
    return Boolean(item.component)
}

/**
 * 是否有子路由
 * @param item - 权限路由
 */
function hasChildren(item: AuthRoute.Route) {
    return Boolean(item.children && item.children.length)
}

/**
 * 是否是单层级路由
 * @param item - 权限路由
 */
function isSingleRoute(item: AuthRoute.Route) {
    return Boolean(item.meta.singleLayout)
}
