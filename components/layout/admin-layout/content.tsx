"use client"

import { useEffect, useMemo } from "react"
import { redirect, usePathname, useSearchParams } from "next/navigation"

import { getCookie } from "cookies-next"
import NProgress from "nprogress"
import {
    Card,
    CardBody,
    CardHeader,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    Navbar as NextUiNavbar
} from "@nextui-org/react"

import { PageTransitionEffect } from "@/components/layout"
import AuthNavbarItem from "@/components/layout/root-layout/auth-button"
import SearchInput from "@/components/layout/root-layout/search-input"
import { parseJwtPayload } from "~/utils/common"
import Breadcrumbs from "./breadcrumbs"
import AdminMenu from "./menu"

interface contentProps {
    children: React.ReactNode
}

export default function Content({ children }: contentProps) {
    const pathname = usePathname()
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
        <Card className='grow lg:m-5' shadow='sm'>
            <NextUiNavbar maxWidth='full' isBordered className='lg:hidden'>
                <NavbarContent justify='start' className='data-[justify=start]:basis-4/5'>
                    <Breadcrumbs />
                </NavbarContent>

                <NavbarContent justify='end' className='data-[justify=end]:basis-1/5'>
                    <AuthNavbarItem />
                    <NavbarMenuToggle />
                </NavbarContent>

                <NavbarMenu>
                    <SearchInput />
                    <AdminMenu />
                </NavbarMenu>
            </NextUiNavbar>

            <CardHeader className='hidden lg:flex'>
                <Breadcrumbs size='lg' />
            </CardHeader>
            <CardBody className='overflow-x-hidden'>
                <PageTransitionEffect>{children}</PageTransitionEffect>
            </CardBody>
        </Card>
    )
}
