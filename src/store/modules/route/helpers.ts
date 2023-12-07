import { localStg } from "~/utils/storage";

export function getMenus() {
	return localStg.get("menus") || [];
}

export function getSearchMenus() {
	return localStg.get("searchMenus") || [];
}

/** 去除用户相关缓存 */
export async function clearRouteStorage() {
	localStg.remove("menus");
	localStg.remove("searchMenus");
}
