import { Col, Image } from "@/components/common"
import { Card, CardBody, CardFooter } from "@nextui-org/react"

export function PageUnderConstruction({ pageTitle }: { pageTitle: string | undefined }) {
    return (
        <Col className='mt-[20vh]'>
            <Card shadow='none'>
                <CardBody className='py-5'>
                    <Image
                        src='/images/page-under-construction.svg'
                        width={[450, 300]}
                        originalSize={{ width: 960, height: 960 }}
                        alt='page-under-construction'
                        darkModeBrightBackground
                    />
                </CardBody>
                <CardFooter className='flex justify-center'>
                    <p className='text-xl font-bold'>
                        <span className='text-primary'>{pageTitle} </span>
                        页面开发中...
                    </p>
                </CardFooter>
            </Card>
        </Col>
    )
}
