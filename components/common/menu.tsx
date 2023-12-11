"use client"
import { memo } from "react"

import { Icon } from "@iconify/react"
import { Accordion as NextUiAccordion, AccordionItem, ScrollShadow } from "@nextui-org/react"

import { siteConfig } from "~/config"
import { useMenuItemState, useMenuItemAction } from "~/store/modules/menu"
import { useRouterPush } from "~/utils/router"

export function AdminMenu() {
    const { menuItem } = useMenuItemState()
    const { setMenuItem } = useMenuItemAction()
    const { routerPush } = useRouterPush()

    function handlePress(item: any) {
        setMenuItem(item)
        routerPush(item.path)
    }

    const MenuAccordion = memo(function Accordion({ items }: any) {
        // 是否有子菜单
        function hasChildren(item: any): boolean {
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
                defaultExpandedKeys={[`AccordionItem - ${items[0].meta.order}`]} // 默认打开第一个
                // selectionMode='multiple'
            >
                {items.map((item: any) => (
                    <AccordionItem
                        aria-label={item.name}
                        key={`AccordionItem - ${item.meta.order}`}
                        title={item.meta.title}
                        startContent={
                            <Icon
                                icon={item.meta.icon}
                                color={
                                    item.meta.title === menuItem.meta.title ? "#006FEE" : "#11181C"
                                }
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
            <MenuAccordion items={siteConfig.sideMenuItems} />
        </ScrollShadow>
    )
}
