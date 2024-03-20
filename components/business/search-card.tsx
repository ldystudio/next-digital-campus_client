"use client"

import { useState } from "react"

import { useResponsive } from "ahooks"
import toast from "react-hot-toast"
import { Icon } from "@iconify/react"
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Card,
    CardBody,
    CardHeader,
    Input
} from "@nextui-org/react"

import { Row } from "@/components/common"
import { isArray } from "~/utils/common"

interface SearchCardProps {
    inputItems: {
        label: string
        name: string
        value?: string
        alternativeValues?: string[]
    }[]
}

// const inputItems = [
//     { label: "学号", name: "id" },
//     { label: "姓名", name: "real_name" },
//     { label: "班级", name: "class_name" },
//     { label: "邮箱", name: "email" },
//     { label: "手机号", name: "phone" },
//     { label: "性别", name: "gender", alternativeValues: ["男", "女"] },
//     {
//         label: "就读状态",
//         name: "enrollment_status",
//         alternativeValues: ["在校", "休学", "毕业"]
//     }
// ]

export default function SearchCard({ inputItems }: SearchCardProps) {
    const [searchItems, setSearchItems] = useState(inputItems)
    const responsive = useResponsive()

    function handleReset() {
        setSearchItems(inputItems.map((item) => ({ ...item, value: "" })))
    }

    function handleSearch() {
        const hasValue = searchItems.some((item) => item.value)
        !hasValue ? toast.error("请输入搜索内容") : console.log(searchItems)
    }

    return (
        <Card className='order-1 lg:row-span-2'>
            <CardHeader className='pb-0'>搜索</CardHeader>
            <CardBody className='no-scrollbar grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4'>
                {searchItems.map((items) =>
                    isArray(items.alternativeValues) ? (
                        <Autocomplete
                            key={`Autocomplete - ${items.label}`}
                            label={items.label}
                            variant='bordered'
                            onSelectionChange={(key) => {
                                setSearchItems(
                                    searchItems.map((item) =>
                                        item.name === items.name
                                            ? { ...item, value: key as string }
                                            : item
                                    )
                                )
                            }}
                            selectedKey={items.value}
                        >
                            {items.alternativeValues.map((alternativeValue) => (
                                <AutocompleteItem key={alternativeValue}>
                                    {alternativeValue}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>
                    ) : (
                        <Input
                            key={`Input - ${items.label}`}
                            label={items.label}
                            variant='bordered'
                            value={items.value}
                            onValueChange={(value) => {
                                setSearchItems(
                                    searchItems.map((item) =>
                                        item.name === items.name
                                            ? { ...item, value }
                                            : item
                                    )
                                )
                            }}
                        />
                    )
                )}
                <Row justify='center'>
                    {responsive?.md ? (
                        <>
                            <Button
                                variant='bordered'
                                startContent={
                                    <Icon
                                        icon='solar:restart-bold-duotone'
                                        height='auto'
                                    />
                                }
                                onPress={handleReset}
                            >
                                重置
                            </Button>
                            <Button
                                variant='bordered'
                                color='primary'
                                startContent={
                                    <Icon
                                        icon='solar:minimalistic-magnifer-line-duotone'
                                        height={20}
                                    />
                                }
                                onPress={handleSearch}
                            >
                                搜索
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant='bordered' isIconOnly onPress={handleReset}>
                                <Icon icon='solar:restart-bold-duotone' height='auto' />
                            </Button>
                            <Button
                                variant='bordered'
                                color='primary'
                                isIconOnly
                                onPress={handleSearch}
                            >
                                <Icon
                                    icon='solar:minimalistic-magnifer-line-duotone'
                                    height={20}
                                />
                            </Button>
                        </>
                    )}
                </Row>
            </CardBody>
        </Card>
    )
}
