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
import Breadcrumbs from "./breadcrumbs"
import AdminMenu from "./menu"

interface ContentProps {
    children: React.ReactNode
}

export default function Content({ children }: ContentProps) {
    return (
        <Card className='grow' shadow='none' radius='none'>
            <NextUiNavbar
                maxWidth='full'
                className='lg:hidden'
                classNames={{ wrapper: "px-3" }}
            >
                <NavbarContent
                    justify='start'
                    className='data-[justify=start]:basis-4/5'
                >
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

            <CardHeader className='hidden lg:multi-["flex;pl-0"]'>
                <Breadcrumbs size='lg' />
            </CardHeader>
            <CardBody className='overflow-x-hidden px-3 pb-3 pt-0 lg:multi-["pb-5;pl-0;pr-5;pt-0"]'>
                <div className='w-full rounded-3xl bg-default-100 p-3 lg:multi-["min-h-full;p-5"]'>
                    <PageTransitionEffect className='h-full'>
                        {children}
                    </PageTransitionEffect>
                </div>
            </CardBody>
        </Card>
    )
}
