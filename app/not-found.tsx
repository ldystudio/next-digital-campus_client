"use client"

import { Button, Code } from "@nextui-org/react"

import { Col, Row } from "@/components/common/dimension"
import { LocalImage } from "@/components/common/image"
import { useRouterPush } from "~/utils/router"

export default function NotFoundPage() {
    const { routerBack, toHome } = useRouterPush()

    return (
        <Col fullWidth justify='center' className='h-screen gap-4 px-5'>
            <LocalImage
                src='/images/falling.svg'
                alt='未找到页面'
                width={[400, 300]}
                originalSize={{ width: 584, height: 490 }}
            />
            <Code color='primary' size='lg'>
                404 Page Not Found
            </Code>
            <Row>
                <Button
                    variant='bordered'
                    radius='full'
                    color='primary'
                    onClick={() => {
                        routerBack()
                    }}
                >
                    返回
                </Button>
                <Button
                    variant='solid'
                    radius='full'
                    color='secondary'
                    onClick={() => toHome()}
                >
                    首页
                </Button>
            </Row>
        </Col>
    )
}
