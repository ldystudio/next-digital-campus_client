import { Card, CardBody, Progress } from "@nextui-org/react"

import { Row } from "@/components/common"

interface LabelProgressProps {
    label: string
    value: number
}

function LabelProgress({ label, value }: LabelProgressProps) {
    return (
        <Row fullWidth justify='between' className='gap-6'>
            <div className='w-20 text-right font-bold'>{label}</div>
            <Progress aria-label={label} value={value} className='w-40' />
            <div className='font-bold'>{value}%</div>
        </Row>
    )
}

export default function ProgressCard({ className }: PageComponentProps) {
    return (
        <Card className={className}>
            <CardBody className='justify-center space-y-6'>
                <p className='text-center text-lg font-bold'>你的课程</p>
                <div className='mx-auto space-y-4'>
                    <LabelProgress label='JS' value={85} />
                    <LabelProgress label='Python' value={38} />
                    <LabelProgress label='React' value={25} />
                    <LabelProgress label='Django' value={20} />
                </div>
                <Row justify='center'>
                    <div className='size-5 rounded-full bg-default' />
                    <span className='text-default-500'>你的目标</span>
                    <div className='ml-4 size-5 rounded-full bg-primary' />
                    <span className='text-default-500'>已完成</span>
                </Row>
            </CardBody>
        </Card>
    )
}
