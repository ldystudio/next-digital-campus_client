"use client"

import { useEffectOnce } from "~/hooks/common"
import { useRouterPush } from "~/utils/router"

export default function RedirectPage() {
    const { routerPush } = useRouterPush()

    useEffectOnce(() => {
        routerPush("/dashboard/analysis")
    })
}
