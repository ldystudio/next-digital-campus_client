"use client"

import React from "react"

import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion"
import { useMediaQuery } from "usehooks-ts"
import { Card, useDisclosure } from "@nextui-org/react"

import MessagingChatHeader from "./messaging-chat-header"
import MessagingChatInbox from "./messaging-chat-inbox"
import MessagingChatProfile from "./messaging-chat-profile"
import MessagingChatWindow from "./messaging-chat-window"

export default function ChatApp() {
    const variants = React.useMemo(
        () => ({
            enter: (direction: number) => ({
                x: direction > 0 ? 20 : -20,
                opacity: 0
            }),
            center: {
                zIndex: 1,
                x: 0,
                opacity: 1
            },
            exit: (direction: number) => ({
                zIndex: 0,
                x: direction < 0 ? 20 : -20,
                opacity: 0
            })
        }),
        []
    )

    const [[page, direction], setPage] = React.useState([0, 0])
    const { onOpen } = useDisclosure()
    const { onOpenChange: onProfileSidebarOpenChange } = useDisclosure()

    const isCompact = useMediaQuery("(max-width: 1024px)")
    const isMobile = useMediaQuery("(max-width: 768px)")

    const paginate = React.useCallback(
        (newDirection: number) => {
            setPage((prev) => {
                if (!isCompact) return prev

                const currentPage = prev[0]

                if (currentPage < 0 || currentPage > 2) return [currentPage, prev[1]]

                return [currentPage + newDirection, newDirection]
            })
        },
        [isCompact]
    )

    const content = React.useMemo(() => {
        let component = <MessagingChatInbox page={page} paginate={paginate} />

        if (isCompact) {
            switch (page) {
                case 1:
                    component = <MessagingChatWindow paginate={paginate} />
                    break
                case 2:
                    component = <MessagingChatProfile paginate={paginate} />
                    break
            }

            return (
                <LazyMotion features={domAnimation}>
                    <m.div
                        key={page}
                        animate='center'
                        className='col-span-12'
                        custom={direction}
                        exit='exit'
                        initial='enter'
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        variants={variants}
                    >
                        {component}
                    </m.div>
                </LazyMotion>
            )
        }

        return (
            <>
                <MessagingChatInbox className='lg:col-span-4' />
                {/* <MessagingChatWindow
                    className='lg:col-span-6 xl:col-span-5'
                    toggleMessagingProfileSidebar={onProfileSidebarOpenChange}
                /> */}
            </>
        )
    }, [page, paginate, isCompact, onProfileSidebarOpenChange, direction, variants])

    return isCompact ? (
        <AnimatePresence custom={direction} initial={false} mode='wait'>
            {content}
        </AnimatePresence>
    ) : (
        content
    )
}
