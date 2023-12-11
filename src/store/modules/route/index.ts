import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { useAppSelector, useAppDispatch } from "~/hooks/common"
import { getAuthState } from "~/store"
import {
    filterAuthRoutesByUserPermission,
    transformAuthRouteToMenu,
    transformAuthRouteToSearchMenus
} from "~/utils/router"
import { localStg } from "~/utils/storage"
import { getIsInitAuthRoute, getMenus, getSearchMenus, clearRouteStorage } from "./helpers"

interface RouteState {
    /** 是否初始化了权限路由 */
    isInitAuthRoute: boolean
    /** 路由首页name(前端静态路由时生效，后端动态路由该值会被后端返回的值覆盖) */
    previousRoutePath: AuthRoute.RoutePath
    /** 菜单 */
    menus: App.GlobalMenuOption[]
    /** 搜索的菜单 */
    searchMenus: AuthRoute.Route[]
}

const initialState: RouteState = {
    isInitAuthRoute: getIsInitAuthRoute(),
    previousRoutePath: "/",
    menus: getMenus(),
    searchMenus: getSearchMenus()
}

const routeSlice = createSlice({
    name: "route",
    initialState,
    reducers: {
        resetRouteStore() {
            return {
                isInitAuthRoute: false,
                previousRoutePath: "/",
                menus: [],
                searchMenus: []
            }
        },
        setIsInitAuthRoute(state, action: PayloadAction<boolean>) {
            return { ...state, isInitAuthRoute: action.payload }
        },
        setPreviousRoutePath(state, action: PayloadAction<AuthRoute.RoutePath>) {
            return { ...state, previousRoutePath: action.payload }
        },
        setMenus(state, action: PayloadAction<App.GlobalMenuOption[]>) {
            return { ...state, menus: action.payload }
        },
        setSearchMenus(state, action: PayloadAction<AuthRoute.Route[]>) {
            return { ...state, searchMenus: action.payload }
        }
    }
})

export default routeSlice.reducer

export function useRouteState() {
    return useAppSelector((state) => state.route)
}

export function useRouteAction() {
    const dispatch = useAppDispatch()

    async function resetRouteStore() {
        await clearRouteStorage()
        dispatch(routeSlice.actions.resetRouteStore())
    }
    function setIsInitAuthRoute(isInitAuthRoute: boolean) {
        dispatch(routeSlice.actions.setIsInitAuthRoute(isInitAuthRoute))
    }
    function setPreviousRoutePath(previousRoutePath: AuthRoute.RoutePath) {
        dispatch(routeSlice.actions.setPreviousRoutePath(previousRoutePath))
    }
    function setMenus(menus: App.GlobalMenuOption[]) {
        dispatch(routeSlice.actions.setMenus(menus))
        localStg.set("menus", menus)
    }
    function setSearchMenus(searchMenus: AuthRoute.Route[]) {
        dispatch(routeSlice.actions.setSearchMenus(searchMenus))
        localStg.set("searchMenus", searchMenus)
    }

    /** 初始化静态路由 */
    async function initStaticRoute() {
        const staticRoutes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/route`, {
            cache: "no-store"
        }).then((res) => res.json())

        const { userInfo } = getAuthState()
        const routes = filterAuthRoutesByUserPermission(staticRoutes, userInfo.userRole)

        await handleAuthRoute(routes)

        setIsInitAuthRoute(true)
    }

    /**
     * 处理权限路由
     * @param routes - 权限路由
     */
    async function handleAuthRoute(routes: AuthRoute.Route[]) {
        setMenus(transformAuthRouteToMenu(routes))
        setSearchMenus(transformAuthRouteToSearchMenus(routes))
    }

    return {
        resetRouteStore,
        setIsInitAuthRoute,
        setPreviousRoutePath,
        setMenus,
        setSearchMenus,
        initStaticRoute
    }
}
