"use client"

import { Card, CardBody } from "@nextui-org/card"

import { Col } from "@/components/common/dimension"
import { GoogleSans } from "~/config"
import { useClientServerCheck } from "~/hooks/common"
import { getAuthState } from "~/store"

export default function BannerCard({ className }: PageComponentProps) {
    const { userName } = getAuthState().userInfo
    const { isServer } = useClientServerCheck()

    return (
        <Card className={className}>
            <CardBody className='flex flex-col items-center justify-around gap-3 overflow-hidden lg:flex-row'>
                <Col fullHeight justify='center' className={`${GoogleSans.className}`}>
                    <p className='text-3xl text-white lg:text-4xl'>Welcome back</p>
                    <p className='text-2xl font-medium text-white lg:text-3xl'>
                        {isServer ? "Anonymous" : userName}
                    </p>
                </Col>
            </CardBody>
        </Card>
    )
}
