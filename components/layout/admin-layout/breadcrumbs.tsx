"use client"

import { Icon } from "@iconify/react"
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
            {...props}
        >
            {parentMenuItem && (
                <BreadcrumbItem
                    startContent={
                        <Icon icon={parentMenuItem.icon ?? ""} color='#006FEE' height='auto' />
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
                                <Icon
                                    icon={activeMenuItem.icon ?? ""}
                                    color='#006FEE'
                                    height='auto'
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
                                    startContent={<Icon icon={child.icon ?? ""} height='auto' />}
                                    variant='faded'
                                    color='primary'
                                    onPress={() => {
                                        routerPush(child.routePath as AuthRoute.RoutePath)
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
