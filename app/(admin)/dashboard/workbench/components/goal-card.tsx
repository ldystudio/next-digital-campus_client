import { Card, CardBody, CircularProgress } from "@nextui-org/react"

import { Row } from "@/components/common"

export default function GoalCard({ className }: PageComponentProps) {
    return (
        <Card className={className}>
            <CardBody className='flex flex-row justify-around'>
                <Card className='w-5/12' shadow='none'>
                    <CardBody className='justify-center space-y-4'>
                        <p className='text-center text-xl font-bold'>今日目标</p>
                        <CircularProgress
                            aria-label={`Circular Progress - 今日目标`}
                            classNames={{
                                base: "mx-auto",
                                svg: "w-48 h-48 drop-shadow-md",
                                track: "stroke-orange-400/10",
                                indicator: "stroke-orange-400",
                                value: "text-3xl font-bold"
                            }}
                            value={85}
                            valueLabel={`${85}%`}
                            showValueLabel
                        />
                        <Row justify='center'>
                            <div className='size-5 rounded-full bg-orange-400/10' />
                            <span className='text-default-500'>总目标</span>
                            <div className='ml-4 size-5 rounded-full bg-orange-400' />
                            <span className='text-default-500'>已完成</span>
                        </Row>
                    </CardBody>
                </Card>
                <Card className='w-5/12' shadow='none'>
                    <CardBody className='justify-center space-y-4'>
                        <p className='text-center text-lg font-bold'>课程进度</p>
                        <CircularProgress
                            aria-label={`Circular Progress - 课程进度`}
                            classNames={{
                                base: "mx-auto",
                                svg: "w-48 h-48 drop-shadow-md",
                                track: "stroke-primary/10",
                                indicator: "stroke-primary",
                                value: "text-3xl font-bold"
                            }}
                            value={50}
                            valueLabel={`${50}%`}
                            showValueLabel
                        />
                        <Row justify='center'>
                            <div className='size-5 rounded-full bg-primary/10' />
                            <span className='text-default-500'>所有课程</span>
                            <div className='ml-4 size-5 rounded-full bg-primary' />
                            <span className='text-default-500'>已通过</span>
                        </Row>
                    </CardBody>
                </Card>
            </CardBody>
        </Card>
    )
}
