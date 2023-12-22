"use client"
import { useMediaQuery } from "react-responsive"
import { useIsClient } from "usehooks-ts"
import { Button, NavbarItem, Skeleton } from "@nextui-org/react"

import { UserCard } from "@/components/business"
import { Col, Row } from "@/components/common"
import { useAuthAction } from "~/store/modules/auth"
import { useRouterPush } from "~/utils/router"

export default function AuthNavbarItem() {
    const { toLogin, toRegister } = useRouterPush()
    const { isLogin } = useAuthAction()
    const isMobile = useMediaQuery({ maxWidth: 768 })
    const isClient = useIsClient()

    if (!isClient) {
        return (
            <Row fullWidth space={3} className='max-w-[300px]'>
                <div>
                    <Skeleton className='flex rounded-full w-10 h-10 lg:w-12 lg:h-12' />
                </div>
                <Col fullWidth items='start' space={2}>
                    <Skeleton className='h-3 w-14 lg:w-20 rounded-lg' />
                    <Skeleton className='h-3 w-10 lg:w-12 rounded-lg' />
                </Col>
            </Row>
        )
    }

    return (
        <NavbarItem className='flex gap-4' suppressHydrationWarning>
            {isLogin() ? (
                <UserCard
                    // description='Full-stack developer, @getnextui lover she/her'
                    avatarProps={{
                        isBordered: true,
                        size: isMobile ? "sm" : "md"
                    }}
                    className='ml-1'
                    classNames={{ wrapper: "ml-1" }}
                />
            ) : (
                <>
                    <Button variant='flat' size={isMobile ? "sm" : "md"} onClick={() => toLogin()}>
                        登录
                    </Button>
                    <Button
                        variant='flat'
                        size={isMobile ? "sm" : "md"}
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
