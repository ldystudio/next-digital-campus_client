import { useMemo } from "react"

import _ from "lodash"
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

import { useMenuItemAction, useMenuItemState } from "~/store/modules/menu"
import { useRouteState } from "~/store/modules/route"
import { useRouterPush } from "~/utils/router"

export default function Breadcrumbs(props: BreadcrumbsProps) {
    const { menus } = useRouteState()
    const menuItem = useMenuItemState()
    const { setMenuItem } = useMenuItemAction()
    const { routerPush } = useRouterPush()
    const parentMenuItem = useMemo(
        () => _.find(menus, (menu) => _.some(menu.children, (child) => child.key === menuItem.key)),
        [menus, menuItem.key]
    )

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
                                <Icon icon={menuItem.icon ?? ""} color='#006FEE' height='auto' />
                            }
                            className='h-6 pl-0 pr-1'
                            radius='full'
                            variant='light'
                        >
                            {menuItem.label}
                        </Button>
                    </DropdownTrigger>
                    {parentMenuItem && (
                        <DropdownMenu>
                            {parentMenuItem.children!.map((child) => (
                                <DropdownItem
                                    key={child.key}
                                    startContent={<Icon icon={child.icon ?? ""} height='auto' />}
                                    variant='faded'
                                    color='primary'
                                    onPress={() => {
                                        setMenuItem(child)
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
