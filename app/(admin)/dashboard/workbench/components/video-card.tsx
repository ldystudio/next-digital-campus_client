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
        <Card fullWidth className='h-14 bg-primary-50' shadow='none'>
            <CardBody>
                <Row justify='between'>
                    <Iconify icon={icon} height={32} />
                    <p className='font-bold'>{title}</p>
                    <Row>
                        <Iconify icon='solar:users-group-rounded-line-duotone' />
                        <p>{member}人</p>
                    </Row>
                    <Row>
                        <Iconify icon='solar:cloud-download-line-duotone' />
                        <p>{size}MB</p>
                    </Row>
                    <Iconify icon='solar:menu-dots-bold-duotone' />
                </Row>
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
