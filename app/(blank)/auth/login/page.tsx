import { Card, CardBody } from "@nextui-org/react"

import { Col, Image, Link, ThemeSwitch } from "@/components/common"
import LoginTabs from "./login-tabs"

export default async function LoginPage() {
    return (
        <Card className='container relative h-full px-0 lg:h-3/4'>
            <ThemeSwitch className='absolute left-5 top-5 z-10' />
            <CardBody className='flex flex-row items-center justify-between overflow-y-hidden bg-circuit-board'>
                <Col className='w-0 lg:w-1/2'>
                    <Image
                        src='/images/log-in-girl.svg'
                        alt='log-in-girl'
                        width={600}
                        originalSize={{ width: 1500, height: 1600 }}
                        className='hidden lg:block'
                    />
                </Col>
                <Col space={3} className='h-[600px] w-full lg:w-1/2'>
                    <Link href='/index' color='foreground'>
                        <Image
                            src='/logo.png'
                            alt='login'
                            width={75}
                            originalSize={{ width: 143, height: 149 }}
                            className='dark:invert'
                            isBlurred={false}
                        />
                    </Link>
                    <p className='text-3xl font-bold text-secondary'>欢迎回来</p>
                    <Card className='w-[95%] lg:w-[450px]' shadow='none'>
                        <CardBody className='overflow-hidden'>
                            <LoginTabs />
                        </CardBody>
                    </Card>
                </Col>
            </CardBody>
        </Card>
    )
}
