// import { create } from "zustand";
// import { immer } from "zustand/middleware/immer";

// import { useAuthStore } from "~/store/auth";
// import {
// 	localStg,
// 	filterAuthRoutesByUserPermission,
// 	getCacheRoutes,
// 	getConstantRouteNames,
// 	transformAuthRouteToVueRoutes,
// 	transformAuthRouteToVueRoute,
// 	transformAuthRouteToMenu,
// 	transformAuthRouteToSearchMenus,
// 	transformRouteNameToRoutePath,
// 	transformRoutePathToRouteName,
// 	sortRoutes
// } from "~/utils";
// import { useAsyncStore } from "~/utils/store";

// // import { useTabStore } from "../tab";

// const initialRouteState = {
// 	/** 是否初始化了权限路由 */
// 	isInitAuthRoute: false,
// 	/** 缓存的路由名称 */
// 	cacheRoutes: []
// };

// export const useRouteStore = create<typeof initialRouteState>()(immer(() => initialRouteState));

// export function resetRouteStore() {
// 	useRouteStore.setState(() => ({
// 		...initialRouteState
// 	}));
// }

// // export function handleAuthRoute(routes: AuthRoute.Route[]) {
// // 	(this.menus as App.GlobalMenuOption[]) = transformAuthRouteToMenu(routes);
// // 	this.searchMenus = transformAuthRouteToSearchMenus(routes);

// // 	const vueRoutes = transformAuthRouteToVueRoutes(routes);

// // 	vueRoutes.forEach(route => {
// // 		router.addRoute(route);
// // 	});
// // 	this.cacheRoutes = getCacheRoutes(vueRoutes);
// // },
// /** 初始化静态路由 */
// async function useInitStaticRoute() {
// 	const userRole = useAsyncStore(useAuthStore, (state) => state.userInfo.userRole);

// 	const routes = filterAuthRoutesByUserPermission(staticRoutes, userRole);
// 	handleAuthRoute(routes);

// 	useRouteStore.setState((state) => {
// 		state.isInitAuthRoute = true;
// 	});
// }
