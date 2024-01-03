"use client"

import { Accordion, AccordionItem, ScrollShadow, Skeleton } from "@nextui-org/react"

import { Col, Iconify } from "@/components/common"
import { useClientServerCheck } from "~/hooks/common"
import { useMenuItemAction, useMenuItemState } from "~/store/modules/menuItem"
import { getAuthMenus } from "~/store/modules/route/helpers"
import { useRouterPush } from "~/utils/router"

export default function AdminMenu() {
    const { routerPush } = useRouterPush()
    const { activeMenuItem, parentMenuItem } = useMenuItemState()
    const { setParentMenuItem } = useMenuItemAction()
    const authMenus = getAuthMenus()
    const { isServer } = useClientServerCheck()

    if (isServer) {
        return (
            <ScrollShadow className='h-full w-full' size={20} hideScrollBar>
                <Col className='mt-2 gap-y-4'>
                    {Array.from({ length: 15 }).map((_, index) => (
                        <Skeleton key={index} className='h-6 w-4/5 rounded-lg' />
                    ))}
                </Col>
            </ScrollShadow>
        )
    }

    const itemClasses = {
        base: "py-0 w-full",
        title: "font-normal text-medium hover:text-primary",
        trigger: "px-2 py-0 hover:bg-default-100 rounded-lg h-10 flex items-center",
        indicator: "text-medium"
    }

    function hasChildren(item: App.AdminMenu) {
        return Boolean(item.children && item.children.length)
    }

    function handlePress(item: App.AdminMenu) {
        routerPush(item.routePath as AuthRoute.RoutePath)
    }

    return (
        <ScrollShadow className='h-full w-full' size={20} hideScrollBar>
            <Accordion
                showDivider={false} // 不显示分割符
                itemClasses={itemClasses}
                defaultExpandedKeys={[`${parentMenuItem.key}`]}
                // selectionMode='multiple'
            >
                {authMenus.map((item) => (
                    <AccordionItem
                        key={item.key}
                        aria-label={item.label}
                        title={item.label}
                        startContent={
                            <Iconify
                                icon={item.icon || ""}
                                color={
                                    item.key === parentMenuItem.key
                                        ? "primary"
                                        : undefined
                                }
                            />
                        }
                        hideIndicator={!hasChildren(item)}
                        classNames={{
                            content: hasChildren(item) ? "flex" : "hidden"
                        }}
                        onPress={() => {
                            if (!hasChildren(item)) {
                                setParentMenuItem(item)
                                handlePress(item)
                            }
                        }}
                    >
                        {item.children && (
                            <Accordion showDivider={false} itemClasses={itemClasses}>
                                {item.children.map((subItem) => (
                                    <AccordionItem
                                        key={subItem.key}
                                        aria-label={subItem.label}
                                        title={subItem.label}
                                        startContent={
                                            <Iconify
                                                icon={subItem.icon || ""}
                                                color={
                                                    subItem.key === activeMenuItem.key
                                                        ? "primary"
                                                        : undefined
                                                }
                                            />
                                        }
                                        hideIndicator
                                        classNames={{ content: "hidden" }}
                                        onPress={() => {
                                            handlePress(subItem)
                                        }}
                                    />
                                ))}
                            </Accordion>
                        )}
                    </AccordionItem>
                ))}
            </Accordion>
        </ScrollShadow>
    )
}
