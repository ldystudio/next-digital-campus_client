"use client"

import React from "react"

import { Lumiflex } from "uvcanvas"
import * as adventurer from "@dicebear/adventurer"
import { createAvatar } from "@dicebear/core"
import { Icon } from "@iconify/react"
import { parseDate } from "@internationalized/date"
import {
    Avatar,
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    DatePicker,
    Input,
    Radio,
    RadioGroup
} from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"

import { NotoSansSC } from "~/config"
import { useMutation } from "~/hooks/common"
import { getAuthState } from "~/store"
import { useAuthAction } from "~/store/modules/auth"
import { isString } from "~/utils/common"
import { localStg } from "~/utils/storage"

interface InformationCardProps {
    title: string
    url: string
    columns: Columns
    statusField?: string
    dateFields: string[]
    statusOptions?: Columns
    disabledInput?: string[]
}

type Information = {
    id: string
    user_id?: string
    guardian_name?: string | null
    guardian_phone?: string | null
    photograph?: string | null
    identification_number?: string | null
    birth_date?: string | null
    gender?: string | null
    real_name?: string | null
    phone?: string | null
    email?: string
    avatar?: string
}

type Classes = {
    id: string
    class_name: string
}

interface RenderCellProps {
    data: Information
    columns: Columns
    updateInformation: (key: string, value: any) => void
    disabledInput?: string[]
    dateFields: string[]
    statusField?: string
    statusOptions?: Columns
    groupField?: string
    groupFetchUrl?: string
}

function RenderCell({
    data,
    columns,
    updateInformation,
    disabledInput,
    dateFields,
    statusField,
    statusOptions
}: RenderCellProps) {
    return columns.map((column) => {
        const cid = column.uid as keyof Information
        if (dateFields.includes(cid)) {
            return (
                <DatePicker
                    key={cid}
                    label={column.name}
                    labelPlacement='outside'
                    variant='flat'
                    defaultValue={
                        data[cid] ? parseDate(data[cid] as string) : undefined
                    }
                    showMonthAndYearPickers
                    isRequired={column.isRequired}
                    onChange={(date) => {
                        updateInformation(cid, date.toString())
                    }}
                />
            )
        }
        if (isString(statusField) && statusField === cid && statusOptions) {
            return (
                <RadioGroup
                    key={cid}
                    label={column.name}
                    color='primary'
                    orientation='horizontal'
                    defaultValue={`${data[cid]}`}
                    onValueChange={(value) => {
                        updateInformation(cid, Number(value))
                    }}
                    isDisabled={disabledInput?.includes(cid)}
                    classNames={{ wrapper: "justify-center" }}
                    isRequired={column.isRequired}
                >
                    {statusOptions.map((status) => (
                        <Radio key={status.uid} value={status.uid}>
                            {status.name}
                        </Radio>
                    ))}
                </RadioGroup>
            )
        }
        switch (column.uid) {
            case "actions":
            case "service_status":
            case "notes":
                return null
            case "classes":
                return (
                    <Input
                        key={cid}
                        label={column.name}
                        labelPlacement='outside'
                        placeholder={`请输入${column.name}`}
                        defaultValue={
                            data[cid]
                                ? (data[cid] as unknown as Classes[])
                                      ?.map((cls) => cls.class_name)
                                      .join("；")
                                : undefined
                        }
                        onValueChange={(value) => {
                            updateInformation(cid, value)
                        }}
                        isRequired={column.isRequired}
                        isDisabled={disabledInput?.includes(cid)}
                    />
                )
            default:
                return (
                    <Input
                        key={cid}
                        label={column.name}
                        labelPlacement='outside'
                        placeholder={`请输入${column.name}`}
                        type={typeof data[cid] === "number" ? "number" : "text"}
                        defaultValue={data[cid] ?? undefined}
                        onValueChange={(value) => {
                            updateInformation(cid, value)
                        }}
                        isRequired={column.isRequired}
                        isDisabled={disabledInput?.includes(cid)}
                    />
                )
        }
    })
}

export default function InformationCard({
    title,
    url,
    columns,
    statusField,
    dateFields,
    statusOptions,
    disabledInput
}: InformationCardProps) {
    const initInformation: Information = { id: "" }
    const { userInfo } = getAuthState()
    const { setUserInfo } = useAuthAction()
    const [information, setInformation] = React.useState<Information>(initInformation)
    const [avatar, setAvatar] = React.useState<string>("")

    const { data, refetch } = useQuery<Information>({ queryKey: [url] })
    const { mutate } = useMutation({
        url: `${url}${information.id}/`,
        method: "patch",
        data: information,
        headMsg: "修改",
        onSuccessAfter: () => {
            refetch()
            if (userInfo.avatar !== avatar) {
                const newUserInfo = {
                    ...userInfo,
                    avatar: avatar
                }
                setUserInfo(newUserInfo)
                localStg.set("userInfo", newUserInfo)
            }
        },
        onSettledAfter: () => {
            setInformation({ id: information.id })
        }
    })

    React.useEffect(() => {
        if (data) {
            setInformation({
                ...information,
                id: data.id
            })
            setAvatar(data?.avatar ?? "")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    function updateInformation(key: string, value: any) {
        setInformation({
            ...information,
            [key]: value
        })
    }

    return (
        <Card className='rounded-3xl lg:h-full'>
            {/* @ts-expect-error 类型“IntrinsicAttributes & LumiflexProps”上不存在属性“children”*/}
            <Lumiflex className='flex items-center justify-center'>
                <Card className='absolute z-10 max-w-xl p-2'>
                    <CardHeader
                        className={`${NotoSansSC.className} flex flex-col items-start px-4 pb-0 pt-4`}
                    >
                        <p className='text-large'>{title}</p>
                        <div className='flex gap-4 py-4'>
                            <Badge
                                classNames={{
                                    badge: "w-5 h-5"
                                }}
                                color='primary'
                                content={
                                    <Button
                                        isIconOnly
                                        className='p-0 text-primary-foreground'
                                        radius='full'
                                        size='sm'
                                        variant='light'
                                        onPress={() => {
                                            const str = Math.random()
                                                .toString(36)
                                                .slice(-8)
                                            setAvatar(str)
                                            updateInformation("avatar", str)
                                        }}
                                    >
                                        <Icon icon='solar:refresh-bold-duotone' />
                                    </Button>
                                }
                                placement='bottom-right'
                                shape='circle'
                            >
                                <Avatar
                                    className='h-14 w-14'
                                    src={createAvatar(adventurer, {
                                        seed: avatar
                                    }).toDataUriSync()}
                                />
                            </Badge>
                            <div className='flex flex-col items-start justify-center'>
                                {data && (
                                    <p className='font-medium'>{data.real_name}</p>
                                )}
                                <span
                                    className='text-small capitalize text-default-500'
                                    suppressHydrationWarning
                                >
                                    {userInfo.userRole}
                                </span>
                            </div>
                        </div>
                        <p className='text-small text-default-400'>
                            该照片将用于您的个人资料，并对平台的其他用户可见。
                        </p>
                        <p className='text-small text-danger-200'>
                            不能修改的部分请联系管理员修改
                        </p>
                    </CardHeader>
                    <CardBody className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        {data && (
                            <RenderCell
                                data={data}
                                columns={columns}
                                updateInformation={updateInformation}
                                disabledInput={disabledInput}
                                dateFields={dateFields}
                                statusField={statusField}
                                statusOptions={statusOptions}
                            />
                        )}
                    </CardBody>
                    <CardFooter className='mt-4 justify-end gap-2'>
                        <Button color='primary' radius='full' onPress={() => mutate()}>
                            修改
                        </Button>
                    </CardFooter>
                </Card>
            </Lumiflex>
        </Card>
    )
}
