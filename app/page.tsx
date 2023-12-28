"use client"

import { useEffect } from "react"

import { useRouterPush } from "~/utils/router"

export default function RedirectPage() {
    const { routerPush } = useRouterPush()

    useEffect(() => {
        routerPush("/index")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
