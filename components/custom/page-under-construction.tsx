import { Card, CardBody, CardFooter } from "@nextui-org/react"

import { Col } from "@/components/common/dimension"
import { LocalImage } from "@/components/common/image"

export function PageUnderConstruction({
    pageTitle
}: {
    pageTitle: string | undefined
}) {
    return (
        <Col
            justify='center'
            className={"h-[88vh] rounded-3xl bg-background lg:h-full"}
        >
            <Card shadow='none'>
                <CardBody className='py-5'>
                    <LocalImage
                        src='/images/page-under-construction.svg'
                        width={[450, 300]}
                        originalSize={{ width: 960, height: 960 }}
                        alt='page-under-construction'
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
