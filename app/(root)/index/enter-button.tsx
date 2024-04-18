"use client"

import { Button } from "@nextui-org/button"

import { useRouterPush } from "~/utils/router"

export default function EnterButton() {
    const { routerPush } = useRouterPush()

    return (
        <Button
            color='primary'
            radius='full'
            variant='shadow'
            onPress={() => routerPush("/dashboard/analysis")}
        >
            进入
        </Button>
    )
}
