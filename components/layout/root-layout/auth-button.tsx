"use client"

import { useResponsive } from "ahooks"
import { Button } from "@nextui-org/button"
import { NavbarItem } from "@nextui-org/navbar"
import { Skeleton } from "@nextui-org/skeleton"

import { UserCard } from "@/components/business/user-card"
import { Col, Row } from "@/components/common/dimension"
import { useClientServerCheck } from "~/hooks/common"
import { useAuthAction } from "~/store/modules/auth"
import { useRouterPush } from "~/utils/router"

export default function AuthNavbarItem() {
    const { toLogin, toRegister } = useRouterPush()
    const { isLogin } = useAuthAction()
    const responsive = useResponsive()
    const { isServer } = useClientServerCheck()

    if (isServer) {
        return (
            <Row fullWidth space={3} className='max-w-[300px]'>
                <div>
                    <Skeleton className='flex h-10 w-10 rounded-full lg:h-12 lg:w-12' />
                </div>
                <Col fullWidth items='start' space={2}>
                    <Skeleton className='h-3 w-14 rounded-lg lg:w-20' />
                    <Skeleton className='h-3 w-10 rounded-lg lg:w-12' />
                </Col>
            </Row>
        )
    }

    return (
        <NavbarItem className='flex gap-4' suppressHydrationWarning>
            {isLogin() ? (
                <UserCard
                    avatarProps={{
                        isBordered: true,
                        size: responsive?.md ? "md" : "sm"
                    }}
                    className='ml-1'
                    classNames={{ wrapper: "ml-1" }}
                />
            ) : (
                <>
                    <Button
                        variant='flat'
                        size={responsive?.md ? "md" : "sm"}
                        onClick={() => toLogin()}
                    >
                        登录
                    </Button>
                    <Button
                        variant='flat'
                        size={responsive?.md ? "md" : "sm"}
                        color='primary'
                        className='hidden md:block'
                        onClick={() => toRegister()}
                    >
                        注册
                    </Button>
                </>
            )}
        </NavbarItem>
    )
}
