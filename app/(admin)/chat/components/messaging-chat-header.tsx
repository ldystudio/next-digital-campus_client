"use client"

import React from "react"

import { Icon } from "@iconify/react"
import { Button, Chip } from "@nextui-org/react"

import { cn } from "~/utils"

interface MessagingChatHeaderProps {
    page?: number
    onOpen?: () => void
    paginate?: (direction: number) => void
    className?: string
}

export default function MessagingChatHeader({
    page,
    paginate,
    onOpen,
    className
}: MessagingChatHeaderProps) {
    return (
        <header
            className={cn(
                "flex w-full items-center justify-between p-3 sm:px-6",
                className
            )}
        >
            {page === 0 ? (
                <Button
                    isIconOnly
                    className={cn("flex text-default-500", {
                        "sm:hidden": page === 0
                    })}
                    size='sm'
                    variant='light'
                    onPress={onOpen}
                >
                    <Icon height={24} icon='solar:hamburger-menu-outline' width={24} />
                </Button>
            ) : (
                <Button
                    isIconOnly
                    className='flex text-default-500 lg:hidden'
                    size='sm'
                    variant='light'
                    onPress={() => paginate?.(-1)}
                >
                    <Icon height={24} icon='solar:arrow-left-outline' width={24} />
                </Button>
            )}

            <div
                className={cn(
                    "flex w-full items-center justify-center text-large font-bold text-foreground lg:justify-start",
                    {
                        "sm:justify-start": page === 0
                    }
                )}
            >
                <h2 className='text-large font-bold text-foreground'>Chats</h2>
                <Chip
                    classNames={{
                        base: "h-[18px] ml-2 bg-default-100",
                        content: "text-default-600 text-[10px] font-medium"
                    }}
                    size='sm'
                    variant='flat'
                >
                    24
                </Chip>
            </div>

            <Button
                isIconOnly
                className='ml-auto h-[28px] w-[28px] min-w-[28px] rounded-[6px] border-1 border-default-200 p-0 text-default-400'
                variant='bordered'
            >
                <Icon
                    className='text-default-400 [&>g]:stroke-[2px]'
                    icon='solar:pen-new-square-linear'
                    width={15}
                />
            </Button>
        </header>
    )
}
