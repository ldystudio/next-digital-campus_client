import { isArray } from "~/utils/common"
import { localStg } from "~/utils/storage"

const menus = localStg.get("menus")
const searchMenus = localStg.get("searchMenus")

export function getIsInitAuthRoute() {
    return isArray<App.AdminMenu[]>(menus) && isArray<AuthRoute.Route[]>(searchMenus)
}

export function getMenus() {
    return localStg.get("menus") || []
}

export function getSearchMenus() {
    return localStg.get("searchMenus") || []
}

/** 去除路由相关缓存 */
export async function clearRouteStorage() {
    localStg.remove("menus")
    localStg.remove("searchMenus")
}
