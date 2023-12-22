"use client"

import { redirect, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo } from "react"

import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react"
import { getCookie } from "cookies-next"
import NProgress from "nprogress"

import { Iconify } from "@/components/common"
import { PageTransitionEffect } from "@/components/layout"
import { useMenuItemState } from "~/store/modules/menu"
import { parseJwtPayload } from "~/utils/common"

interface contentProps {
    children: React.ReactNode
}

export default function Content({ children }: contentProps) {
    const pathname = usePathname()
    const menuItem = useMenuItemState()
    const searchParams = useSearchParams()
    const token = getCookie("accessToken")
    const res = useMemo(() => parseJwtPayload(token), [token])

    useEffect(() => {
        if (!res || Object.keys(res).length === 0) {
            redirect(`/auth/login?redirect=${pathname}`)
        }
        NProgress.done()
    }, [pathname, res, searchParams, token])

    return (
        <Card className='m-5 grow' shadow='sm'>
            <CardHeader>
                <Iconify icon={menuItem.icon!} color='#006FEE' />
                <p className='text-xl'>{menuItem.label}</p>
            </CardHeader>
            <Divider />
            <CardBody className='overflow-x-hidden'>
                <PageTransitionEffect>{children}</PageTransitionEffect>
            </CardBody>
        </Card>
    )
}
