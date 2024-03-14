import clsx from "clsx"
import { Card, CardBody, CardHeader } from "@nextui-org/react"

import { Iconify, Link, Row } from "@/components/common"

interface VideoInfoProps {
    icon: string
    title: string
    member: number
    size: number
}

function VideoInfo({ icon, title, member, size }: VideoInfoProps) {
    return (
        <Card fullWidth className='bg-primary-50 lg:h-14' shadow='none' isPressable>
            <CardBody className='justify-between gap-3 lg:flex-row'>
                <Row justify='between'>
                    <Iconify icon={icon} height={32} />
                    <p className='font-bold'>{title}</p>
                </Row>
                <Row justify='between' className='lg:w-1/2'>
                    <Row>
                        <Iconify icon='solar:users-group-rounded-line-duotone' />
                        <p>{member}人</p>
                    </Row>
                    <Row>
                        <Iconify icon='solar:cloud-download-line-duotone' />
                        <p>{size}MB</p>
                    </Row>
                </Row>
                <Iconify
                    icon='solar:menu-dots-bold-duotone'
                    height={32}
                    className='hidden lg:block'
                />
            </CardBody>
        </Card>
    )
}

export default function VideoCard({ className }: PageComponentProps) {
    return (
        <Card className={clsx(className, "px-3")}>
            <CardHeader className='justify-between pb-0 font-bold'>
                <p>课程视频</p>
                <Link href='/'>查看全部</Link>
            </CardHeader>
            <CardBody className='gap-5'>
                <VideoInfo
                    icon='logos:javascript'
                    title='高级JavaScript教程'
                    member={32}
                    size={2.2}
                />
                <VideoInfo
                    icon='logos:react'
                    title='React精通'
                    member={36}
                    size={5.2}
                />
            </CardBody>
        </Card>
    )
}
