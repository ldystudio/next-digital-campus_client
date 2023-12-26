"use client"

import { useEffect, useMemo } from "react"
import { redirect, usePathname } from "next/navigation"

import { getCookie } from "cookies-next"
import _ from "lodash"
import NProgress from "nprogress"

import { useMenuItemAction } from "~/store/modules/menu"
import { useRouteState } from "~/store/modules/route"
import { parseJwtPayload } from "~/utils/common"
import { transformAuthRouteToMenu, useRouterPush } from "~/utils/router"

export default function Expand() {
    const pathname = usePathname()
    const token = getCookie("accessToken")
    const res = useMemo(() => parseJwtPayload(token), [token])

    useEffect(() => {
        if (!res || Object.keys(res).length === 0) {
            redirect(`/auth/login?redirect=${pathname}`)
        }
        NProgress.done()
    }, [pathname, res, token])

    const { searchMenus, previousRoutePath } = useRouteState()
    const { setMenuItem } = useMenuItemAction()
    const { isPushNewPage } = useRouterPush()

    useEffect(() => {
        if (isPushNewPage(pathname as AuthRoute.RoutePath)) return
        const pathToMenuItem = _.find(searchMenus, (menu) => menu.path === pathname)
        if (pathToMenuItem) setMenuItem(transformAuthRouteToMenu([pathToMenuItem])[0])
    }, [pathname, previousRoutePath, searchMenus, isPushNewPage, setMenuItem])

    return <></>
}
