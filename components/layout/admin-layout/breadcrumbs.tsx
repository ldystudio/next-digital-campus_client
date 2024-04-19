"use client"

import {
    BreadcrumbItem,
    BreadcrumbsProps,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Breadcrumbs as NextUiBreadcrumbs
} from "@nextui-org/react"

import { Iconify } from "@/components/common/iconify"
import { useMenuItemState } from "~/store/modules/menuItem"
import { useRouterPush } from "~/utils/router"

export default function Breadcrumbs(props: BreadcrumbsProps) {
    const { activeMenuItem, parentMenuItem } = useMenuItemState()
    const { routerPush } = useRouterPush()

    return (
        <NextUiBreadcrumbs
            className='flex'
            variant='solid'
            radius='full'
            separator='/'
            itemClasses={{
                separator: "px-2"
            }}
            classNames={{ list: "flex-nowrap" }}
            {...props}
        >
            {parentMenuItem && (
                <BreadcrumbItem
                    startContent={
                        <Iconify icon={parentMenuItem.icon ?? ""} color='primary' />
                    }
                >
                    {parentMenuItem.label}
                </BreadcrumbItem>
            )}
            <BreadcrumbItem classNames={{ item: "px-0" }}>
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            startContent={
                                <Iconify
                                    icon={activeMenuItem.icon ?? ""}
                                    color='primary'
                                />
                            }
                            className='h-6 pl-0 pr-1'
                            radius='full'
                            variant='light'
                        >
                            {activeMenuItem.label}
                        </Button>
                    </DropdownTrigger>
                    {parentMenuItem.children && (
                        <DropdownMenu aria-label='Breadcrumbs Dropdown Menu'>
                            {parentMenuItem.children.map((child) => (
                                <DropdownItem
                                    key={child.key}
                                    startContent={
                                        <Iconify
                                            icon={child.icon ?? ""}
                                            color={
                                                child.key === activeMenuItem.key
                                                    ? "primary"
                                                    : undefined
                                            }
                                        />
                                    }
                                    variant='faded'
                                    color='primary'
                                    onPress={() => {
                                        routerPush(
                                            child.routePath as AuthRoute.RoutePath
                                        )
                                    }}
                                >
                                    {child.label}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    )}
                </Dropdown>
            </BreadcrumbItem>
        </NextUiBreadcrumbs>
    )
}
