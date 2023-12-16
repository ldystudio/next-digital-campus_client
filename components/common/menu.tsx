"use client"
import { memo } from "react"

import { useIsClient } from "usehooks-ts"
import { Icon } from "@iconify/react"
import { Accordion as NextUiAccordion, AccordionItem, ScrollShadow } from "@nextui-org/react"

import { useMenuItemState, useMenuItemAction } from "~/store/modules/menu"
import { getMenus } from "~/store/modules/route/helpers"
import { useRouterPush } from "~/utils/router"

interface AccordionProps {
    items: App.AdminMenu[]
}

export function AdminMenu() {
    const { setMenuItem } = useMenuItemAction()
    const { routerPush } = useRouterPush()
    const menuItem = useMenuItemState()
    const menus = getMenus()
    const isClient = useIsClient()

    if (!isClient) {
        return <p>Loading</p>
    }

    function handlePress(item: App.AdminMenu) {
        setMenuItem(item)
        routerPush(item.routePath as AuthRoute.RoutePath)
    }

    const MenuAccordion = memo(function Accordion({ items }: AccordionProps) {
        // 是否有子菜单
        function hasChildren(item: App.AdminMenu) {
            return item.children && item.children.length > 0
        }

        return (
            <NextUiAccordion
                showDivider={false} // 不显示分割符
                itemClasses={{
                    base: "py-0 w-full",
                    title: "font-normal text-medium hover:text-primary",
                    trigger: "px-2 py-0 hover:bg-default-100 rounded-lg h-10 flex items-center",
                    indicator: "text-medium"
                }}
                defaultExpandedKeys={[`AccordionItem - ${items[0].key}`]} // 默认打开第一个
                // selectionMode='multiple'
            >
                {items.map((item: any) => (
                    <AccordionItem
                        aria-label={item.label}
                        key={`AccordionItem - ${item.key}`}
                        title={item.label}
                        startContent={
                            <Icon
                                icon={item.icon}
                                color={item.label === menuItem.label ? "#006FEE" : "#11181C"}
                                height='auto'
                            />
                        }
                        hideIndicator={!hasChildren(item)}
                        classNames={{
                            content: hasChildren(item) ? "" : "hidden"
                        }}
                        onPress={() => {
                            !hasChildren(item) && handlePress(item)
                        }}
                    >
                        {hasChildren(item) && <MenuAccordion items={item.children} />}
                    </AccordionItem>
                ))}
            </NextUiAccordion>
        )
    })

    return (
        <ScrollShadow className='h-full w-full' size={20} hideScrollBar>
            <MenuAccordion items={menus} />
        </ScrollShadow>
    )
}
