import { ReactNode } from "react"

import { Card, CardFooter, CardProps, Radio, RadioProps } from "@nextui-org/react"

import { cn } from "~/utils"

interface CardRadioProps {
    children: ReactNode
    radioProps: RadioProps // value值必须设置
    cardProps?: CardProps
    name?: string
}

export function CardRadio({ children, radioProps, cardProps, name }: CardRadioProps) {
    cardProps = cardProps ? cardProps : {}
    cardProps.isFooterBlurred = !!name

    return (
        <Radio
            {...radioProps}
            classNames={{
                base: cn(
                    "m-0 inline-flex items-center justify-between bg-content1 hover:bg-content2",
                    "cursor-pointer flex-col-reverse gap-2 rounded-lg border-2 border-transparent",
                    "data-[selected=true]:border-primary"
                ),
                wrapper: "hidden"
            }}
        >
            <Card {...cardProps} className='-ml-2'>
                {children}
                {name && (
                    <CardFooter className='absolute bottom-1 z-10 ml-6 w-[calc(100%_-_50px)] justify-center overflow-hidden rounded-large border-1 border-white/20 py-0 shadow-small before:rounded-xl before:bg-white/10'>
                        <span className='text-tiny text-white'>{name}</span>
                    </CardFooter>
                )}
            </Card>
        </Radio>
    )
}
