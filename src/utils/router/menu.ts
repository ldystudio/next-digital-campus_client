/**
 * 将权限路由转换成菜单
 * @param routes - 路由
 */
export function transformAuthRouteToMenu(routes: AuthRoute.Route[]): App.AdminMenu[] {
    const globalMenu: App.AdminMenu[] = []
    routes.forEach((route) => {
        const { name, path, meta } = route
        const routeName = name as string
        let menuChildren: App.AdminMenu[] | undefined
        if (route.children && route.children.length > 0) {
            menuChildren = transformAuthRouteToMenu(route.children)
        }
        const menuItem: App.AdminMenu = addPartialProps({
            menu: {
                key: routeName,
                label: meta.title,
                routeName,
                routePath: path
            },
            icon: meta.icon,
            children: menuChildren
        })

        globalMenu.push(menuItem)
    })

    return globalMenu
}

/**
 * 获取当前路由所在菜单数据的paths
 * @param activeKey - 当前路由的key
 * @param menus - 菜单数据
 */
export function getActiveKeyPathsOfMenus(activeKey: string, menus: App.AdminMenu[]) {
    const keys = menus.map((menu) => getActiveKeyPathsOfMenu(activeKey, menu)).flat(1)
    return keys
}

function getActiveKeyPathsOfMenu(activeKey: string, menu: App.AdminMenu) {
    const keys: string[] = []
    if (activeKey.startsWith(menu.routeName)) {
        keys.push(menu.routeName)
    }
    if (menu.children) {
        keys.push(
            ...menu.children
                .map((item) =>
                    getActiveKeyPathsOfMenu(activeKey, item as App.AdminMenu)
                )
                .flat(1)
        )
    }
    return keys
}

/** 给菜单添加可选属性 */
function addPartialProps(config: {
    menu: App.AdminMenu
    icon?: string
    children?: App.AdminMenu[]
}) {
    const item = { ...config.menu }

    const { icon, children } = config

    if (icon) {
        Object.assign(item, { icon })
    }

    if (children) {
        Object.assign(item, { children })
    }
    return item
}

export function isPathInAuthMenus(
    path: AuthRoute.RoutePath,
    menus: App.AdminMenu[]
): boolean {
    const set = new Set<string>(menus.map((item) => item.routePath))
    return (
        set.has(path) ||
        menus.some(
            (menu) => menu.children?.some((item) => isPathInAuthMenus(path, [item]))
        )
    )
}
