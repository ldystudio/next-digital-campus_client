import { Card, CardBody } from "@nextui-org/react"

import { Col, ThemeSwitch, Link, Image } from "@/components/common"
import { readAllRouteModuleFiles } from "~/router"
import LoginTabs from "./login-tabs"

export default async function LoginPage() {
    const staticRoutes = await readAllRouteModuleFiles()

    return (
        <Card className='h-full lg:h-3/4 container px-0 relative'>
            <ThemeSwitch className='absolute z-10 top-5 left-5' />
            <CardBody className='flex flex-row items-center justify-between bg-circuit-board overflow-y-hidden'>
                <Col className='w-0 lg:w-1/2'>
                    <Image
                        src='/images/log-in-girl.svg'
                        alt='log-in-girl'
                        width={600}
                        originalSize={{ width: 1500, height: 1600 }}
                        className='hidden lg:block'
                    />
                </Col>
                <Col space={3} className='w-full lg:w-1/2 h-[600px]'>
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
                            <LoginTabs staticRoutes={staticRoutes} />
                        </CardBody>
                    </Card>
                </Col>
            </CardBody>
        </Card>
    )
}
