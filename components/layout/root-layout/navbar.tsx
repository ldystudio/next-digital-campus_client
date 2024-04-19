import clsx from "clsx"
import {
    link as linkStyles,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Navbar as NextUINavbar
} from "@nextui-org/react"

import { GithubIcon, Logo } from "@/components/common/icons"
import { Link } from "@/components/common/link"
import { ThemeSwitch } from "@/components/common/theme-switch"
import { siteConfig } from "~/config"
import AuthNavbarItem from "./auth-button"
import SearchInput from "./search-input"

export default function Navbar() {
    return (
        <NextUINavbar maxWidth='2xl' position='sticky' isBordered>
            <NavbarContent className='basis-1/5 sm:basis-full ' justify='start'>
                <NavbarBrand className='max-w-fit gap-3'>
                    <Link
                        className='flex items-center justify-start gap-1'
                        href='/index'
                        color='secondary'
                    >
                        <Logo />
                    </Link>
                </NavbarBrand>
                <div className='ml-2 hidden justify-start gap-7 lg:flex'>
                    {siteConfig.navItems.map((item, index) => (
                        <NavbarItem key={`navItems - ${index}`}>
                            <Link
                                className={clsx(
                                    linkStyles({ color: "foreground" }),
                                    "active:font-medium active:text-primary"
                                )}
                                // @ts-expect-error: link not in AuthRoute.RoutePath
                                href={item.href}
                            >
                                {item.label}
                            </Link>
                        </NavbarItem>
                    ))}
                </div>
            </NavbarContent>

            <NavbarContent
                className='hidden basis-1/5 sm:flex sm:basis-full'
                justify='end'
            >
                <NavbarItem className='hidden gap-2 sm:flex'>
                    <ThemeSwitch />
                </NavbarItem>
                <NavbarItem className='hidden lg:flex'>
                    <SearchInput />
                </NavbarItem>
                <AuthNavbarItem />
                <NavbarMenuToggle className='flex lg:hidden' />
            </NavbarContent>

            <NavbarContent className='basis-1 pl-4 sm:hidden' justify='end'>
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
                                        : index === siteConfig.navItems.length - 1
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
