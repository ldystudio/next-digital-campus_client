import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { routes as staticRoutes } from "~/router/modules";
import { useAuthStore } from "~/store/auth";
import {
	filterAuthRoutesByUserPermission,
	transformAuthRouteToMenu,
	transformAuthRouteToSearchMenus
} from "~/utils/router";
import { useAsyncStore } from "~/utils/store";

interface RouteState {
	/** 是否初始化了权限路由 */
	isInitAuthRoute: boolean;
	/** 路由首页name(前端静态路由时生效，后端动态路由该值会被后端返回的值覆盖) */
	routeHomeName: AuthRoute.AllRouteKey;
	/** 菜单 */
	menus: App.GlobalMenuOption[];
	/** 搜索的菜单 */
	searchMenus: AuthRoute.Route[];
}

const initialRouteState: RouteState = {
	isInitAuthRoute: false,
	routeHomeName: "/",
	menus: [],
	searchMenus: []
};

export const useRouteStore = create<RouteState>()(immer(() => initialRouteState));

export function resetRouteStore() {
	useRouteStore.setState(() => ({
		...initialRouteState
	}));
}

export function setIsInitAuthRoute(isInitAuthRoute: boolean) {
	useRouteStore.setState((state) => {
		state.isInitAuthRoute = isInitAuthRoute;
	});
}

export function setMenus(menus: App.GlobalMenuOption[]) {
	useRouteStore.setState((state) => {
		state.menus = menus;
	});
}

export function setSearchMenus(searchMenus: AuthRoute.Route[]) {
	useRouteStore.setState((state) => {
		state.searchMenus = searchMenus;
	});
}

export function useRouteActions() {
	const userRole = useAuthStore((state) => state.userInfo.userRole);

	/** 初始化权限路由 */
	async function initAuthRoute() {
		await initStaticRoute();
	}

	/** 初始化静态路由 */
	async function initStaticRoute() {
		const routes = filterAuthRoutesByUserPermission(staticRoutes, userRole);
		handleAuthRoute(routes);

		setIsInitAuthRoute(true);
	}

	/**
	 * 处理权限路由
	 * @param routes - 权限路由
	 */
	function handleAuthRoute(routes: AuthRoute.Route[]) {
		setMenus(transformAuthRouteToMenu(routes));
		setSearchMenus(transformAuthRouteToSearchMenus(routes));
	}

	return {
		initAuthRoute
	};
}
