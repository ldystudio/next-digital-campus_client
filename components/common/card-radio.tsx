import { ReactNode } from "react"

import { Radio, RadioProps, cn, CardProps, Card, CardFooter } from "@nextui-org/react"

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
                    "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                    "flex-col-reverse cursor-pointer rounded-lg gap-2 border-2 border-transparent",
                    "data-[selected=true]:border-primary"
                ),
                wrapper: "hidden"
            }}
        >
            <Card {...cardProps} className='-ml-2'>
                {children}
                {name && (
                    <CardFooter className='justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-0 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_50px)] shadow-small ml-6 z-10'>
                        <span className='text-white text-tiny'>{name}</span>
                    </CardFooter>
                )}
            </Card>
        </Radio>
    )
}
