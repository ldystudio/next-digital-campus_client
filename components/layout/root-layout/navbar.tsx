import clsx from "clsx"
import {
    Input,
    Kbd,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Navbar as NextUINavbar,
    link as linkStyles,
    button as buttonStyles
} from "@nextui-org/react"

import { GithubIcon, Link, Logo, SearchIcon, ThemeSwitch } from "@/components/common"
import { siteConfig } from "~/config"
import AuthNavbarItem from "./auth-button"

export default function Navbar() {
    const searchInput = (
        <Input
            aria-label='Search'
            classNames={{
                inputWrapper: "bg-default-200",
                input: "text-sm"
            }}
            endContent={
                <Kbd className='hidden lg:inline-block' keys={["command"]}>
                    K
                </Kbd>
            }
            labelPlacement='outside'
            placeholder='Search...'
            startContent={
                <SearchIcon className='text-base text-default-400 pointer-events-none flex-shrink-0' />
            }
            type='search'
        />
    )

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
                <NavbarItem className='hidden lg:flex'>{searchInput}</NavbarItem>
                <AuthNavbarItem />
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
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarMenu>
                {searchInput}
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
                    <NavbarMenuItem>
                        <Link href='/auth/login' className={buttonStyles({ variant: "flat" })}>
                            登录
                        </Link>
                    </NavbarMenuItem>
                </div>
            </NavbarMenu>
        </NextUINavbar>
    )
}
