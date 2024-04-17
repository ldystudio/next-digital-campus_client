"use client"

// import { useState } from "react"
// import { Button } from "@nextui-org/react"

// import { Col, Row } from "@/components/common/dimension"

// import { useAuthAction, useAuthState } from "~/store/modules/auth"
// import { useRouteAction, useRouteState } from "~/store/modules/route"
// import { verifyAndParseJwtPayload } from "~/utils/common"
// import { localStg } from "~/utils/storage"

export default function Test() {
    // const refreshToken = localStg.get("refreshToken")
    // const { userInfo, isLoading, token } = useAuthState()
    // const { setUserInfo, resetAuthStore } = useAuthAction()
    // const { isInitAuthRoute, authMenus, searchMenus } = useRouteState()
    // const { setIsInitAuthRoute, resetRouteStore } = useRouteAction()
    // const [search, setSearch] = useState("")

    return (
        <>
            {/* <section className='mt-2 space-x-2 bg-red-200 p-2'>
                <Button
                    onClick={() =>
                        setUserInfo({
                            userId: "100",
                            userName: "test",
                            userRole: "admin"
                        })
                    }
                >
                    设置
                </Button>
                <Button onClick={() => resetAuthStore()}>重置</Button>
                <p>userInfo: {JSON.stringify(userInfo)}</p>
                <p>isLoading: {`${isLoading}`}</p>
                <p>token: {token}</p>
                <p>refreshToken: {refreshToken}</p>
            </section>
            <section className='mt-2 space-x-2 bg-zinc-400 p-2'>
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
            <section className='mt-2 space-x-2 bg-blue-200 p-2'>
                <p>isInitAuthRoute: {`${isInitAuthRoute}`}</p>
                <p>authMenus: {`${JSON.stringify(authMenus)}`}</p>
                <p>searchMenus: {`${JSON.stringify(searchMenus)}`}</p>
                <Button onClick={() => setIsInitAuthRoute(!isInitAuthRoute)}>
                    转换
                </Button>
                <Button onClick={() => resetRouteStore()}>重置</Button>
            </section>
            <section>
                <Row className='w-2/3'>
                    <Input
                        value={search}
                        onValueChange={setSearch}
                        placeholder='输入Token或RefreshToken'
                    />
                    <Button
                        onPress={async () => {
                            const res = await verifyAndParseJwtPayload(search)
                            alert("res: " + JSON.stringify(res))
                        }}
                    >
                        校验并解析Token
                    </Button>
                    <Button
                        onPress={async () => {
                            const res = await fetchUserInfo(userInfo.userId)
                            console.log("res: ", res)
                        }}
                    >
                        获取用户信息
                    </Button>
                </Row>
            </section> */}
            {/* <section>
                <Button
                    onPress={async () => {
                        const res = await fetchPageStudentInformation()
                        console.log("res: ", res)
                    }}
                >
                    测试按钮
                </Button>
            </section> */}
        </>
    )
}
