"use client"
import { Button } from "@nextui-org/react"

import { notice } from "@/components/common"

import { useAuthState, useAuthAction } from "~/store/modules/auth"
import { useRouteState, useRouteAction } from "~/store/modules/route"

export default function Test() {
    const { userInfo, isLoading, token } = useAuthState()
    const { setUserInfo, resetAuthStore } = useAuthAction()
    const { isInitAuthRoute, menus, searchMenus } = useRouteState()
    const { setIsInitAuthRoute, resetRouteStore } = useRouteAction()

    return (
        <>
            <section className='mt-2 p-2 space-x-2 bg-red-200'>
                <Button
                    onClick={() =>
                        setUserInfo({ userId: "100", userName: "test", userRole: "admin" })
                    }
                >
                    设置
                </Button>
                <Button onClick={() => resetAuthStore()}>重置</Button>
                <p>userInfo: {JSON.stringify(userInfo)}</p>
                <p>isLoading: {`${isLoading}`}</p>
                <p>token: {token}</p>
            </section>
            <section className='mt-2 p-2 space-x-2 bg-zinc-400'>
                <Button
                    onClick={() =>
                        notice.info({
                            title: "欢迎回来",
                            description: "Admin"
                        })
                    }
                >
                    info消息
                </Button>
                <Button
                    onClick={() => {
                        notice.success({ description: "success" })
                    }}
                >
                    success消息
                </Button>
                <Button
                    onClick={() => {
                        notice.warning({ description: "warning" })
                    }}
                >
                    warning消息
                </Button>
                <Button
                    onClick={() => {
                        notice.error({ description: "error" })
                    }}
                >
                    error消息
                </Button>
            </section>
            <section>
                <p>isInitAuthRoute: {`${isInitAuthRoute}`}</p>
                <p>menus: {`${JSON.stringify(menus)}`}</p>
                <p>searchMenus: {`${JSON.stringify(searchMenus)}`}</p>
                <Button onClick={() => setIsInitAuthRoute(!isInitAuthRoute)}>转换</Button>
                <Button onClick={() => resetRouteStore()}>重置</Button>
            </section>
            <section>
                <p>{process.env.NEXT_PUBLIC_CRYPTO_SECRET}</p>
            </section>
        </>
    )
}
