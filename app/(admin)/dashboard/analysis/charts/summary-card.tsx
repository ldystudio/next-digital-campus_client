import { Card, CardBody, CardHeader, CircularProgress } from "@nextui-org/react"

import { cn } from "~/utils"

interface CircularProgressCardProps {
    title: string
    describe: string
    value: number
    color?:
        | "default"
        | "primary"
        | "secondary"
        | "success"
        | "warning"
        | "danger"
        | undefined
}

function CircularProgressCard({
    title,
    describe,
    value,
    color
}: CircularProgressCardProps) {
    const CircularClass = {
        indicator: `stroke-${color}`,
        track: `stroke-${color}/10`,
        value: `text-3xl font-semibold text-${color}`
    }
    return (
        <Card>
            <CardHeader className='flex-col justify-center'>
                <p>{title}</p>
                <p className='text-2xl font-bold'>{describe}</p>
            </CardHeader>
            <CardBody className='mb-3 items-center justify-center p-0'>
                <CircularProgress
                    classNames={{
                        svg: "w-28 h-28 drop-shadow-md",
                        indicator: CircularClass.indicator,
                        track: CircularClass.track,
                        value: CircularClass.value
                    }}
                    value={value}
                    strokeWidth={4}
                    showValueLabel={true}
                    color={color}
                />
            </CardBody>
        </Card>
    )
}

export default function SummaryCard({ className }: { className?: string }) {
    return (
        <div className={cn("grid grid-cols-2 gap-3 *:rounded-3xl lg:gap-5", className)}>
            <CircularProgressCard
                title='Applications'
                describe='2500'
                value={28}
                color='primary'
            />
            <CircularProgressCard
                title='Candidates'
                describe='300'
                value={2}
                color='secondary'
            />
            <CircularProgressCard
                title='Rejected'
                describe='2864'
                value={16}
                color='success'
            />
            <CircularProgressCard
                title='UX/UI'
                describe='232'
                value={35}
                color='warning'
            />
        </div>
    )
}
