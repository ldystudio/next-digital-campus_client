"use client"

import { useEffect, useState } from "react"

export function useClientServerCheck() {
    const [isClient, setClient] = useState(false)

    useEffect(() => {
        setClient(true)
    }, [])
    return { isClient, isServer: !isClient }
}
