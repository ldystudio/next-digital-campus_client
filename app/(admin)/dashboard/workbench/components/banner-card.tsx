"use client"

import { Card, CardBody } from "@nextui-org/react"

import { Col, Image } from "@/components/common"
import { useAuthState } from "~/store/modules/auth"

export default function BannerCard({ className }: PageComponentProps) {
    const { userName } = useAuthState().userInfo

    return (
        <Card className={className}>
            <CardBody className='justify-around overflow-hidden lg:flex-row'>
                <Col fullHeight justify='center' className='lg:pl-10'>
                    <p className='text-2xl text-white lg:text-3xl'>Welcome back</p>
                    <p className='text-4xl text-white lg:text-5xl'>{userName}</p>
                </Col>
                <Image
                    src='/images/hello-banner.png'
                    alt='hello-banner.png'
                    width={600}
                    originalSize={{ width: 1414, height: 476 }}
                />
            </CardBody>
        </Card>
    )
}
