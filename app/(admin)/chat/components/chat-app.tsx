"use client"

import React from "react"

import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion"
import { useMediaQuery } from "usehooks-ts"
import { useDisclosure } from "@nextui-org/react"

import MessagingChatInbox from "./messaging-chat-inbox"
import MessagingChatProfile from "./messaging-chat-profile"
import MessagingChatWindow from "./messaging-chat-window"

export default function ChatApp() {
    const variants = React.useMemo(
        () => ({
            enter: (direction: number) => ({
                x: direction > 0 ? 200 : -200,
                opacity: 0
            }),
            center: {
                zIndex: 1,
                x: 0,
                opacity: 1
            },
            exit: (direction: number) => ({
                zIndex: 0,
                x: direction < 0 ? 200 : -200,
                opacity: 0
            })
        }),
        []
    )

    const [[page, direction], setPage] = React.useState([0, 0])
    const { onOpenChange: onProfileSidebarOpenChange } = useDisclosure()

    const isCompact = useMediaQuery("(max-width: 1024px)")
    // const isMobile = useMediaQuery("(max-width: 768px)")

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
                        className='col-span-12 transform-gpu'
                        custom={direction}
                        exit='exit'
                        initial='enter'
                        transition={{
                            x: { type: "spring", stiffness: 200, damping: 30 },
                            opacity: { duration: 0.5 }
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
                <MessagingChatWindow
                    className='lg:col-span-8'
                    toggleMessagingProfileSidebar={onProfileSidebarOpenChange}
                />
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
