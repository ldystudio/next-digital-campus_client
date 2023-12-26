"use client"

import { useTheme } from "next-themes"
import { useIsClient } from "usehooks-ts"
import { Icon } from "@iconify/react"
import {
    AccordionItem,
    Accordion as NextUiAccordion,
    ScrollShadow,
    Skeleton
} from "@nextui-org/react"

import { Col } from "@/components/common"
import { useMenuItemState } from "~/store/modules/menuItem"
import { getAuthMenus } from "~/store/modules/route/helpers"
import { useRouterPush } from "~/utils/router"

export default function AdminMenu() {
    const { routerPush } = useRouterPush()
    const { activeMenuItem, parentMenuItem } = useMenuItemState()
    const authMenus = getAuthMenus()
    const isClient = useIsClient()
    const { theme } = useTheme()

    if (!isClient) {
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
            <NextUiAccordion
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
                            <Icon
                                icon={item.icon || ""}
                                color={
                                    item.label === activeMenuItem.label
                                        ? "#006FEE"
                                        : theme === "light"
                                          ? "#11181C"
                                          : "#FAFAFA"
                                }
                                height='auto'
                            />
                        }
                        hideIndicator={!hasChildren(item)}
                        classNames={{
                            content: hasChildren(item) ? "flex" : "hidden"
                        }}
                        onPress={() => {
                            !hasChildren(item) && handlePress(item)
                        }}
                    >
                        {item.children && (
                            <NextUiAccordion showDivider={false} itemClasses={itemClasses}>
                                {item.children.map((subItem) => (
                                    <AccordionItem
                                        key={subItem.key}
                                        aria-label={subItem.label}
                                        title={subItem.label}
                                        startContent={
                                            <Icon
                                                icon={subItem.icon || ""}
                                                color={
                                                    subItem.label === activeMenuItem.label
                                                        ? "#006FEE"
                                                        : theme === "light"
                                                          ? "#11181C"
                                                          : "#FAFAFA"
                                                }
                                                height='auto'
                                            />
                                        }
                                        hideIndicator
                                        classNames={{ content: "hidden" }}
                                        onPress={() => {
                                            handlePress(subItem)
                                        }}
                                    />
                                ))}
                            </NextUiAccordion>
                        )}
                    </AccordionItem>
                ))}
            </NextUiAccordion>
        </ScrollShadow>
    )
}
