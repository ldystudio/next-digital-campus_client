"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import NProgress from "nprogress"

import { getRouteState } from "~/store"
import { useRouteAction } from "~/store/modules/route"
import { isPathInAuthMenus } from "~/utils/router/menu"

/**
 * 自定义路由跳转
 */
export function useRouterPush() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { previousRoutePath } = getRouteState()
    const { setPreviousRoutePath } = useRouteAction()

    function isPushNewPage(path: AuthRoute.RoutePath) {
        return (
            previousRoutePath !== process.env.ROUTE_HOME_PATH &&
            path !== previousRoutePath
        )
    }

    /**
     * 路由跳转
     * @param to - 需要跳转的路由
     * @param redirect - 重定向地址
     * @param newTab - 是否在新的浏览器Tab标签打开
     */
    function routerPush(
        targetPath: AuthRoute.RoutePath,
        redirect?: AuthRoute.RoutePath,
        newTab?: boolean
    ) {
        if (newTab) {
            window.open(targetPath, "_blank")
            return Promise.resolve()
        }

        if (isPushNewPage(targetPath)) {
            NProgress.configure({ showSpinner: false }).start()
        }
        setPreviousRoutePath(targetPath)

        if (redirect) {
            targetPath = `${targetPath}?redirect=${redirect}` as AuthRoute.RoutePath
        }

        router.push(targetPath)
    }

    /** 返回上一级路由 */
    function routerBack() {
        router.back()
    }

    /**
     * 跳转首页
     * @param newTab - 在新的浏览器标签打开
     */
    function toHome(newTab = false) {
        routerPush("/", undefined, newTab)
        NProgress.done()
    }

    /**
     * 跳转登录页面
     * @param redirectUrl - 重定向地址(登录成功后跳转的地址),默认undefined表示取当前地址为重定向地址
     */
    function toLogin(redirectUrl?: AuthRoute.RoutePath) {
        const redirect = redirectUrl || (pathname as AuthRoute.RoutePath)

        routerPush("/auth/login", redirect)
    }
    /**
     * 跳转注册页面
     */
    function toRegister() {
        routerPush("/auth/register", "/auth/login")
    }

    /**
     * 登录成功后跳转重定向的地址
     */
    function toRedirect(authMenus: App.AdminMenu[]) {
        const redirect = searchParams?.get("redirect") as AuthRoute.RoutePath

        if (redirect && isPathInAuthMenus(redirect, authMenus)) {
            routerPush(redirect)
        } else {
            toHome()
        }

        NProgress.done()
    }

    return {
        isPushNewPage,
        routerPush,
        routerBack,
        toHome,
        toLogin,
        toRegister,
        toRedirect
    }
}
