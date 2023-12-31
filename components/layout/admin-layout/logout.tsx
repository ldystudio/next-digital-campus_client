"use client"

import { toast } from "react-toastify"
import { Button } from "@nextui-org/react"

import { Iconify } from "@/components/common"
import { fetchLogout } from "~/service/api"
import { useAuthAction } from "~/store/modules/auth"
import { useRouteAction } from "~/store/modules/route"
import { localStg } from "~/utils/storage"

export default function Logout() {
    const { resetAuthStore } = useAuthAction()
    const { resetRouteStore } = useRouteAction()

    async function logout() {
        const refreshToken = localStg.get("refreshToken") || ""
        const { error } = await fetchLogout(refreshToken)

        if (error && error.type === "axios") {
            return
        }

        await resetRouteStore()
        await resetAuthStore()
        toast.success("退出成功")
    }

    return (
        <Button isIconOnly size='sm' variant='light' onPress={() => logout()}>
            <Iconify icon='solar:logout-3-bold-duotone' rotate={90} />
        </Button>
    )
}
