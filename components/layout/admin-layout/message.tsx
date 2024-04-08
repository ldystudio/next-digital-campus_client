"use client"

import { useState } from "react"

import { useBoolean } from "ahooks"
import clsx from "clsx"
import { format } from "date-fns"
import _sample from "lodash/sample"
import _sortBy from "lodash/sortBy"
import { v4 as uuidv4 } from "uuid"
import {
    Badge,
    Button,
    ButtonGroup,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger
} from "@nextui-org/react"

import { Iconify, Image } from "@/components/common"
import { useEffectOnce } from "~/hooks/common"

const initMessages = [
    {
        id: "bd52bacc-3144-417e-9286-80c19f7f0289",
        title: "Hello World",
        date: "2023-08-22",
        hasRead: false
    },
    {
        id: "344978e8-2135-4386-abed-ff99fd541333",
        title: "Next数字校园0.1.0版本发布了",
        date: "2023-11-19",
        hasRead: false
    },
    {
        id: "8ea8f60c-6792-40b5-b6f5-c0c9468a5dcd",
        title: "Next数字校园0.2.0版本发布了",
        date: "2023-12-22",
        hasRead: false
    },
    {
        id: "7a9e8a47-4850-4c54-ad28-655ff2f303a8",
        title: "Next数字校园0.3.0版本开发中",
        date: "2023-12-23",
        hasRead: false
    },
    {
        id: "f5ec2883-8a94-4a2e-b139-0eb6f5356990",
        title: "你收到了5条消息",
        date: "2023-12-31",
        hasRead: false
    }
]

export default function Message() {
    const [messages, setMessages] = useState(initMessages)
    const [isInvisible, { setTrue, setFalse }] = useBoolean(true)

    useEffectOnce(() => setFalse())

    return (
        <Badge content={messages.length} color='danger' isInvisible={isInvisible}>
            <Dropdown>
                <DropdownTrigger>
                    <Button isIconOnly size='sm' variant='light'>
                        <Iconify icon='solar:chat-line-bold-duotone' />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    variant='faded'
                    color='secondary'
                    aria-label='Message dropdown menu'
                    classNames={{ base: "w-64" }}
                    closeOnSelect={false}
                >
                    <DropdownSection
                        title='通知'
                        showDivider
                        className='no-scrollbar'
                        classNames={{ base: "max-h-[350px] overflow-y-auto" }}
                    >
                        {messages.length > 0 ? (
                            _sortBy(messages, ["date"])
                                .reverse()
                                .map((item) => (
                                    <DropdownItem
                                        key={item.id}
                                        description={item.date}
                                        startContent={
                                            <Iconify
                                                icon='solar:letter-unread-bold-duotone'
                                                color={
                                                    item.hasRead ? undefined : "primary"
                                                }
                                            />
                                        }
                                        title={item.title}
                                        classNames={{
                                            title: clsx(
                                                "text-clip",
                                                item.hasRead && "text-default"
                                            ),
                                            description: item.hasRead && "text-default"
                                        }}
                                    />
                                ))
                        ) : (
                            <DropdownItem
                                key='blank'
                                variant='light'
                                textValue='action'
                                className='text-center'
                            >
                                <Image
                                    src='/images/working-vacation.svg'
                                    alt='暂无通知'
                                    width={232}
                                    originalSize={{ width: 960, height: 960 }}
                                />
                                <p>暂无通知</p>
                            </DropdownItem>
                        )}
                    </DropdownSection>

                    <DropdownSection title='动作'>
                        <DropdownItem key='action' variant='light' textValue='action'>
                            <ButtonGroup
                                variant='flat'
                                size='sm'
                                className='ml-[3px] gap-2'
                            >
                                <Button
                                    color='warning'
                                    onPress={() => {
                                        setMessages([])
                                        setTrue()
                                    }}
                                >
                                    清空
                                </Button>
                                <Button
                                    color='primary'
                                    onPress={() => {
                                        setMessages(
                                            messages.map((item) => ({
                                                ...item,
                                                hasRead: true
                                            }))
                                        )
                                        setTrue()
                                    }}
                                >
                                    全部已读
                                </Button>
                                <Button
                                    color='secondary'
                                    onClick={() => {
                                        setMessages(
                                            messages.concat(
                                                initMessages.map((item) => ({
                                                    ...item,
                                                    id: uuidv4(),
                                                    date: format(
                                                        new Date(
                                                            2023,
                                                            _sample([
                                                                0, 1, 2, 3, 4, 5, 6, 7,
                                                                8, 9, 10, 11
                                                            ]),
                                                            _sample([
                                                                0, 1, 2, 3, 4, 5, 6, 7,
                                                                8, 9, 10, 11, 12, 13,
                                                                14, 15, 16, 17, 18, 19,
                                                                20, 21, 22, 23, 24, 25,
                                                                26, 27, 28, 29, 30, 31
                                                            ])
                                                        ),
                                                        "yyyy-MM-dd"
                                                    )
                                                }))
                                            )
                                        )
                                        setTrue()
                                    }}
                                >
                                    查看更多
                                </Button>
                            </ButtonGroup>
                        </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>
        </Badge>
    )
}
