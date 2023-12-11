import { useRouter, usePathname, useSearchParams } from "next/navigation"

import NProgress from "nprogress"

import { getRouteState } from "~/store"
import { useRouteAction } from "~/store/modules/route"

/**
 * 自定义路由跳转
 */
export function useRouterPush() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { previousRoutePath } = getRouteState()
    const { setPreviousRoutePath } = useRouteAction()

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

        if (previousRoutePath !== process.env.ROUTE_HOME_PATH && targetPath !== previousRoutePath) {
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
    function toRedirect() {
        const redirect = searchParams?.get("redirect") as AuthRoute.RoutePath

        redirect ? routerPush(redirect) : toHome()
        NProgress.done()
    }

    return {
        routerPush,
        routerBack,
        toHome,
        toLogin,
        toRegister,
        toRedirect
    }
}
