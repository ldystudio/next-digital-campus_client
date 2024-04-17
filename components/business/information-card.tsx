"use client"

import React from "react"

import toast from "react-hot-toast"
import useSWR from "swr"
import * as adventurer from "@dicebear/adventurer"
import { createAvatar } from "@dicebear/core"
import { Icon } from "@iconify/react"
import {
    Avatar,
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Radio,
    RadioGroup
} from "@nextui-org/react"

import DatePicker from "@/components/business/date-picker"
import { Col } from "@/components/common/dimension"
import { NotoSansSC } from "~/config"
import { request } from "~/service/request"
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
                <Col key={cid} items='start' space={1}>
                    <p className='text-sm'>
                        {column.name}
                        {column.isRequired && <span className='text-danger'> *</span>}
                    </p>
                    <DatePicker
                        dateStr={data[cid] ?? ""}
                        column={cid}
                        variant='flat'
                        onDateChange={updateInformation}
                        isDisabled={disabledInput?.includes(cid)}
                    />
                </Col>
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

const fetcher = (url: string) => request.get<Information>(url).then((res) => res.data)

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

    function updateInformation(key: string, value: any) {
        setInformation({
            ...information,
            [key]: value
        })
    }

    const { data, mutate } = useSWR(url, fetcher, {
        revalidateOnFocus: false,
        onSuccess: (data) => {
            updateInformation("id", data?.id)
            setAvatar(data?.avatar ?? "")
        }
    })

    return (
        // eslint-disable-next-line tailwindcss/classnames-order
        <Card className='items-center justify-center rounded-3xl bg-cover bg-center bg-no-repeat bg-unsplash-[9T8fywAF54I/lg] lg:h-full'>
            <Card className='max-w-xl p-2' shadow='none'>
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
                                        const str = Math.random().toString(36).slice(-8)
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
                            {data && <p className='font-medium'>{data.real_name}</p>}
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
                    <Button
                        color='primary'
                        radius='full'
                        onPress={async () => {
                            const { error } = await request.patch<Information>(
                                `${url}${information.id}/`,
                                information
                            )
                            if (error) {
                                toast.error(`修改失败，请稍后再试：${error.msg}`)
                            } else {
                                toast.success("修改成功")
                                mutate({ ...data, ...information })
                                if (userInfo.avatar !== avatar) {
                                    const newUserInfo = {
                                        ...userInfo,
                                        avatar: avatar
                                    }
                                    setUserInfo(newUserInfo)
                                    localStg.set("userInfo", newUserInfo)
                                }
                            }
                            setInformation(initInformation)
                        }}
                    >
                        修改
                    </Button>
                </CardFooter>
            </Card>
        </Card>
    )
}
