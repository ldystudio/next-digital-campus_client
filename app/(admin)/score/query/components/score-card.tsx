import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react"

import { NotoSansSC } from "~/config"

export default function ScoreCard(props: any) {
    return (
        <Card className='items-center justify-center rounded-3xl bg-cover bg-center bg-no-repeat bg-unsplash-[9T8fywAF54I/lg] lg:h-full'>
            <Card className='max-w-xl p-2' shadow='none'>
                <CardHeader
                    className={`${NotoSansSC.className} flex flex-col items-start px-4 pb-0 pt-4`}
                >
                    123
                </CardHeader>
                <CardBody className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    456
                </CardBody>
                <CardFooter className='mt-4 justify-end gap-2'>789</CardFooter>
            </Card>
        </Card>
    )
}
