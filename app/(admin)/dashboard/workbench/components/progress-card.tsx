import { Card, CardBody, Progress } from "@nextui-org/react"

import { Row } from "@/components/common"

interface LabelProgressProps {
    label: string
    value: number
}

function LabelProgress({ label, value }: LabelProgressProps) {
    return (
        <tr className='h-8 w-full *:text-center'>
            <td>
                <p className='font-bold'>{label}</p>
            </td>
            <td className='w-2/3 px-6'>
                <Progress aria-label={label} value={value} />
            </td>
            <td>
                <p className='font-bold'>{value}%</p>
            </td>
        </tr>
    )
}

export default function ProgressCard({ className }: PageComponentProps) {
    return (
        <Card className={className}>
            <CardBody className='justify-center space-y-6'>
                <p className='text-center text-lg font-bold'>你的课程</p>
                <table className='mx-2'>
                    <tbody>
                        <LabelProgress label='JS' value={85} />
                        <LabelProgress label='Python' value={38} />
                        <LabelProgress label='React' value={25} />
                        <LabelProgress label='Django' value={20} />
                        <LabelProgress label='Web' value={20} />
                        <LabelProgress label='Test' value={20} />
                    </tbody>
                </table>
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
