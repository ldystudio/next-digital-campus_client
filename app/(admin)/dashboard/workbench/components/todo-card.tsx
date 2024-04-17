"use client"

import { useState } from "react"

import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Checkbox,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@nextui-org/react"

import { Row } from "@/components/common/dimension"

function TodoSubCard({ content }: { content: string }) {
    return (
        <Card>
            <CardBody>
                <Checkbox lineThrough className='truncate'>
                    {content}
                </Checkbox>
            </CardBody>
        </Card>
    )
}

export default function TodoCard() {
    const [todo, setTodo] = useState(["今日事", "今日计划", "今日目标"])
    const [content, setContent] = useState("")

    return (
        <Card className='m-4 mb-0 h-full' shadow='none'>
            <CardHeader className='pt-0 text-center font-bold'>代办</CardHeader>
            <CardBody className='no-scrollbar max-h-[220px] min-h-[70px] gap-3 bg-default-50 lg:min-h-[370px]'>
                {todo.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, translateY: "-50%" }}
                        animate={{ opacity: 1, translateY: "0%" }}
                    >
                        <TodoSubCard key={item} content={item} />
                    </motion.div>
                ))}
            </CardBody>
            <CardFooter>
                <Popover placement='top' showArrow offset={10}>
                    <PopoverTrigger>
                        <Button
                            fullWidth
                            variant='light'
                            color='primary'
                            isIconOnly
                            className='left-1/2 mt-2 -translate-x-1/2'
                        >
                            <Icon icon='solar:add-circle-line-duotone' height='32' />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[240px]'>
                        {(titleProps) => (
                            <div className='w-full px-1 py-2'>
                                <p
                                    className='text-center text-small font-bold text-foreground'
                                    {...titleProps}
                                >
                                    新建代办
                                </p>
                                <Row fullWidth className='mt-2'>
                                    <Input
                                        size='sm'
                                        variant='bordered'
                                        value={content}
                                        onValueChange={setContent}
                                        endContent={
                                            <Button
                                                size='sm'
                                                onPress={() => {
                                                    setTodo([...todo, content])
                                                }}
                                            >
                                                新建
                                            </Button>
                                        }
                                    />
                                </Row>
                            </div>
                        )}
                    </PopoverContent>
                </Popover>
            </CardFooter>
        </Card>
    )
}
