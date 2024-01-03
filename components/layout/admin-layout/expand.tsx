/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useMemo } from "react"
import { redirect, usePathname } from "next/navigation"

import { getCookie } from "cookies-next"
import _ from "lodash"
import NProgress from "nprogress"

import { getMenuItemState } from "~/store"
import { useMenuItemAction } from "~/store/modules/menuItem"
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

    const { authMenus, searchMenus } = useRouteState()
    const { setActiveMenuItem, setParentMenuItem } = useMenuItemAction()
    const { isPushNewPage } = useRouterPush()

    useEffect(() => {
        if (isPushNewPage(pathname as AuthRoute.RoutePath)) return

        const pathToMenuItem = _.find(searchMenus, (menu) => menu.path === pathname)
        if (pathToMenuItem) {
            const activeMenuItem = transformAuthRouteToMenu([pathToMenuItem])[0]
            setActiveMenuItem(activeMenuItem)

            const isInPreviousParentMenuItem = _.some(
                getMenuItemState().parentMenuItem.children,
                { key: activeMenuItem.key }
            )

            if (isInPreviousParentMenuItem) return

            const parentMenuItem = _.find(authMenus, (menu) =>
                _.some(menu.children, { key: activeMenuItem.key })
            )
            if (parentMenuItem) setParentMenuItem(parentMenuItem)
        }
    }, [pathname])

    return <></>
}
