"use client"

import React from "react"

import { format } from "date-fns"
import Clock from "react-live-clock"
import { Icon } from "@iconify/react"
import { Button, Card, CardBody, CardFooter, CardHeader, Chip } from "@nextui-org/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import RecordCard from "@/components/business/record-card"
import { Col } from "@/components/common/dimension"
import { LocalImage } from "@/components/common/image"
import { useMutation } from "~/hooks/common"

type StatusType = {
    id: number
    name: string
    color: "primary" | "secondary" | "success" | "warning" | "danger"
    icon: string
}

type RecordList = {
    type: 1 | 2 | 3 | 4 | 5
    time: string
    ip: string
}

type dataType = {
    id: string
    date: string
    attendance_status: 1 | 2 | 3 | 4 | 5
    check_in_time: string
    ip_address: string
    leave_start_time: string | null
    leave_end_time: string | null
    leave_reason: string | null
    notes: string | null
    real_name: string | null
    email: string
    avatar: string
}

const status: StatusType[] = [
    {
        id: 1,
        name: "出勤",
        color: "success",
        icon: "solar:smile-square-line-duotone"
    },
    {
        id: 2,
        name: "迟到",
        color: "primary",
        icon: "solar:expressionless-square-line-duotone"
    },
    {
        id: 3,
        name: "早退",
        color: "warning",
        icon: "solar:sad-square-line-duotone"
    },
    {
        id: 4,
        name: "请假",
        color: "secondary",
        icon: "solar:face-scan-square-line-duotone"
    },
    {
        id: 5,
        name: "缺勤",
        color: "danger",
        icon: "solar:confounded-square-line-duotone"
    }
]

function EnglishChineseQuotation() {
    const { isPending, data: yhylData } = useQuery({
        queryKey: ["English-Chinese quotation"],
        queryFn: async () =>
            await fetch("https://api.oick.cn/api/yhyl").then((res) => res.json())
    })

    return isPending ? (
        <p>Loading...</p>
    ) : (
        <div className='text-default-500'>
            {yhylData?.data.content}
            <p>{yhylData?.data.note}</p>
        </div>
    )
}

interface AttendanceRecordProps {
    getUrl: string
    recordList: RecordList[]
    setRecordList: (value: React.SetStateAction<RecordList[]>) => void
}

function AttendanceRecord({
    getUrl,
    recordList,
    setRecordList
}: AttendanceRecordProps) {
    const { data } = useQuery<ApiPage.Query<dataType>>({
        queryKey: [getUrl]
    })

    React.useEffect(() => {
        if (data) {
            setRecordList(
                data.results.map((item: dataType) => ({
                    type: item.attendance_status,
                    time: item.check_in_time.includes(".")
                        ? item.check_in_time.slice(0, item.check_in_time.indexOf("."))
                        : item.check_in_time,
                    ip: item.ip_address
                }))
            )
        }
    }, [data, setRecordList])

    return recordList && recordList.length > 0 ? (
        recordList.map((record, index) => (
            <RecordCard
                key={index}
                title={`记录时间: ${record.time}`}
                icon={status[record.type - 1].icon}
                color={status[record.type - 1].color}
                description={`IP地址: ${record.ip}`}
            >
                <Chip color={status[record.type - 1].color}>
                    {status[record.type - 1].name}
                </Chip>
            </RecordCard>
        ))
    ) : (
        <Col>
            <LocalImage
                src='/images/working-vacation.svg'
                alt='暂无通知'
                width={232}
                originalSize={{ width: 960, height: 960 }}
            />
            <p>暂无记录</p>
        </Col>
    )
}

interface AttendanceCardProps {
    getUrl: string
    postUrl: string
    getAllUrl: string
}

export default function AttendanceCard({
    getUrl,
    postUrl,
    getAllUrl
}: AttendanceCardProps) {
    const [recordList, setRecordList] = React.useState<RecordList[]>([])
    const { mutate } = useMutation({
        url: postUrl,
        headMsg: "签到",
        onMutate: () => {
            if (recordList.length >= 4) {
                throw new Error("你已消耗完今日签到次数")
            }
        },
        onSuccessAfter: () => {
            queryClient.invalidateQueries({ queryKey: [getUrl] })
            queryClient.invalidateQueries({ queryKey: [getAllUrl] })
        }
    })
    const queryClient = useQueryClient()

    return (
        <Card className='h-full items-center justify-center lg:multi-["w-1/3;min-w-80"]'>
            <CardHeader className='flex-col gap-2'>
                <p className='text-lg font-medium'>
                    {format(new Date(), "yyyy-MM-dd")}
                </p>
                <EnglishChineseQuotation />
            </CardHeader>

            <CardBody className='flex flex-col gap-3'>
                <p className='text-center text-lg font-medium'>今日记录</p>
                <AttendanceRecord
                    getUrl={getUrl}
                    recordList={recordList}
                    setRecordList={setRecordList}
                />
            </CardBody>

            <CardFooter className='flex min-h-[21rem] flex-col items-center justify-center'>
                <Button
                    color='primary'
                    variant='shadow'
                    className='flex h-44 w-44 flex-col rounded-full text-lg font-bold'
                    startContent={
                        <Icon icon='solar:camera-line-duotone' height='auto' />
                    }
                    endContent={
                        <Clock
                            format={"HH:mm:ss"}
                            ticking={true}
                            className='text-center text-lg font-medium'
                        />
                    }
                    onClick={() => mutate()}
                >
                    签到
                </Button>
            </CardFooter>
        </Card>
    )
}
