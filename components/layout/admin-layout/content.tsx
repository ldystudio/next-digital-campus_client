import {
    Card,
    CardBody,
    CardHeader,
    Divider,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    Navbar as NextUiNavbar
} from "@nextui-org/react"

import { PageTransitionEffect } from "@/components/layout"
import AuthNavbarItem from "@/components/layout/root-layout/auth-button"
import SearchInput from "@/components/layout/root-layout/search-input"
import Breadcrumbs from "./breadcrumbs"
import AdminMenu from "./menu"

interface ContentProps {
    children: React.ReactNode
}

export default function Content({ children }: ContentProps) {
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
            <Divider className='hidden lg:flex' />
            <CardBody className='overflow-x-hidden'>
                <PageTransitionEffect className='h-full'>{children}</PageTransitionEffect>
            </CardBody>
        </Card>
    )
}
