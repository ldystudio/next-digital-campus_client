"use client"

import { Card, CardBody } from "@nextui-org/react"

import { Col } from "@/components/common"
import { GoogleSans } from "~/config"
import { useAuthState } from "~/store/modules/auth"

export default function BannerCard({ className }: PageComponentProps) {
    const { userName } = useAuthState().userInfo

    return (
        <Card className={className}>
            <CardBody className='flex flex-col items-center justify-around gap-3 overflow-hidden lg:flex-row'>
                <Col fullHeight justify='center' className={`${GoogleSans.className}`}>
                    <p className='text-3xl text-white lg:text-4xl'>Welcome back</p>
                    <p className='text-2xl font-medium text-white lg:text-3xl'>
                        {userName}
                    </p>
                </Col>

                {/* <Image
                    src='/images/hello-banner.png'
                    alt='hello-banner.png'
                    width={600}
                    originalSize={{ width: 1414, height: 476 }}
                /> */}
            </CardBody>
        </Card>
    )
}
