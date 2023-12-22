import clsx from "clsx"
import {
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Navbar as NextUINavbar,
    link as linkStyles
} from "@nextui-org/react"

import { GithubIcon, Link, Logo, ThemeSwitch } from "@/components/common"
import { siteConfig } from "~/config"
import AuthNavbarItem from "./auth-button"
import SearchInput from "./search-input"

export default function Navbar() {
    return (
        <NextUINavbar maxWidth='2xl' position='sticky' isBordered>
            <NavbarContent className='basis-1/5 sm:basis-full ' justify='start'>
                <NavbarBrand className='gap-3 max-w-fit'>
                    <Link
                        className='flex justify-start items-center gap-1'
                        href='/index'
                        color='secondary'
                    >
                        <Logo />
                    </Link>
                </NavbarBrand>
                <div className='hidden lg:flex gap-7 justify-start ml-2'>
                    {siteConfig.navItems.map((item, index) => (
                        <NavbarItem key={`navItems - ${index}`}>
                            <Link
                                className={clsx(
                                    linkStyles({ color: "foreground" }),
                                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                                )}
                                color='primary'
                                // @ts-expect-error: link not in AuthRoute.RoutePath
                                href={item.href}
                            >
                                {item.label}
                            </Link>
                        </NavbarItem>
                    ))}
                </div>
            </NavbarContent>

            <NavbarContent className='hidden sm:flex basis-1/5 sm:basis-full' justify='end'>
                <NavbarItem className='hidden sm:flex gap-2'>
                    <Link
                        isExternal
                        // @ts-expect-error: link not in AuthRoute.RoutePath
                        href={siteConfig.links.github}
                    >
                        <GithubIcon className='text-default-500' />
                    </Link>
                    <ThemeSwitch />
                </NavbarItem>
                <NavbarItem className='hidden lg:flex'>
                    <SearchInput />
                </NavbarItem>
                <AuthNavbarItem />
                <NavbarMenuToggle className='flex lg:hidden' />
            </NavbarContent>

            <NavbarContent className='sm:hidden basis-1 pl-4' justify='end'>
                <Link
                    isExternal
                    // @ts-expect-error: link not in AuthRoute.RoutePath
                    href={siteConfig.links.github}
                >
                    <GithubIcon className='text-default-500' />
                </Link>
                <ThemeSwitch />
                <AuthNavbarItem />
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarMenu>
                <SearchInput />
                <div className='mx-4 mt-2 flex flex-col gap-2'>
                    {siteConfig.navItems.map((item, index) => (
                        <NavbarMenuItem key={`navItems2 - ${index}`}>
                            <Link
                                color={
                                    index === 2
                                        ? "primary"
                                        : index === siteConfig.sideMenuItems.length - 1
                                          ? "danger"
                                          : "foreground"
                                }
                                // @ts-expect-error: link not in AuthRoute.RoutePath
                                href={item.href}
                                size='lg'
                            >
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </NextUINavbar>
    )
}
