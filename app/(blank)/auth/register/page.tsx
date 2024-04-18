import { Card, CardBody } from "@nextui-org/card"

import { Col } from "@/components/common/dimension"
import { LocalImage } from "@/components/common/image"
import { Link } from "@/components/common/link"
import { ThemeSwitch } from "@/components/common/theme-switch"
import RegisterTabs from "./register-tabs"

export default function RegisterPage() {
    return (
        <Card className='container relative h-full px-0 lg:h-3/4'>
            <ThemeSwitch className='absolute right-5 top-5 z-10' />
            <CardBody className='flex flex-row-reverse items-center justify-between overflow-y-hidden bg-contour-line'>
                <Col className='w-0 lg:w-1/2'>
                    <LocalImage
                        src='/images/log-in-girl.svg'
                        alt='log-in-girl'
                        width={600}
                        originalSize={{ width: 1500, height: 1600 }}
                        className='hidden lg:block'
                    />
                </Col>
                <Col space={3} fullWidth className='h-[640px] lg:w-1/2'>
                    <Link href='/index' color='foreground'>
                        <LocalImage
                            src='/logo.png'
                            alt='login'
                            width={75}
                            originalSize={{ width: 143, height: 149 }}
                            className='dark:invert'
                            isBlurred={false}
                        />
                    </Link>
                    <p className='text-3xl font-bold text-secondary'>欢迎加入</p>
                    <Card className='w-[95%] lg:w-[450px]' shadow='none'>
                        <CardBody className='overflow-hidden'>
                            <RegisterTabs />
                        </CardBody>
                    </Card>
                </Col>
            </CardBody>
        </Card>
    )
}
