import { isArray } from "~/utils/common"
import { localStg } from "~/utils/storage"

const authMenus = localStg.get("authMenus")
const searchMenus = localStg.get("searchMenus")

export function getIsInitAuthRoute() {
    return isArray<App.AdminMenu[]>(authMenus) && isArray<AuthRoute.Route[]>(searchMenus)
}

export function getAuthMenus() {
    return localStg.get("authMenus") || []
}

export function getSearchMenus() {
    return localStg.get("searchMenus") || []
}

/** 去除路由相关缓存 */
export async function clearRouteStorage() {
    localStg.remove("authMenus")
    localStg.remove("searchMenus")
}
