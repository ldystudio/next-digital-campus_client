"use client"
import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

import clsx from "clsx"
import NProgress from "nprogress"
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react"

import { Iconify } from "@/components/common"
import { useMenuItemState } from "~/store/modules/menu"

interface contentProps {
    children: React.ReactNode
}

export default function Content({ children }: contentProps) {
    const pathname = usePathname()
    const { menuItem } = useMenuItemState()
    const searchParams = useSearchParams()

    useEffect(() => {
        NProgress.done()
    }, [pathname, searchParams])

    return (
        <Card className={clsx("flex-grow mr-5 my-5")} shadow='sm'>
            <CardHeader>
                <Iconify icon={menuItem.meta.icon} color='#006FEE' />
                <p className='text-xl'>{menuItem.meta.title}</p>
            </CardHeader>
            <Divider />
            <CardBody>{children}</CardBody>
        </Card>
    )
}
