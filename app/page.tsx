"use client"

import { useEffect } from "react"

import { useRouterPush } from "~/utils/router"

export default function RedirectPage() {
    const { toHome } = useRouterPush()

    useEffect(() => {
        toHome()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
