"use client"

import { Button } from "@nextui-org/button"
import { Code } from "@nextui-org/code"

import { Col, Row } from "@/components/common/dimension"
import { LocalImage } from "@/components/common/image"
import { useRouterPush } from "~/utils/router"

interface ErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorProps) {
    const { routerBack } = useRouterPush()

    return (
        <Col fullWidth justify='center' className='h-screen gap-4'>
            <LocalImage
                src='/images/crashed-error.svg'
                alt='错误页面'
                width={[400, 300]}
                originalSize={{ width: 960, height: 960 }}
            />

            <Code color='danger' size='lg' className='mx-5'>
                Error: {error.message}
            </Code>
            <Row>
                <Button
                    variant='bordered'
                    radius='full'
                    color='primary'
                    onClick={() => reset()}
                >
                    重试
                </Button>
                <Button
                    variant='solid'
                    radius='full'
                    color='secondary'
                    onClick={() => routerBack()}
                >
                    返回
                </Button>
            </Row>
        </Col>
    )
}
