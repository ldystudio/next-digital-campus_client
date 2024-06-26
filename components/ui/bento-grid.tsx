import { cn } from "~/utils"

export const BentoGrid = ({
    className,
    children
}: {
    className?: string
    children?: React.ReactNode
}) => {
    return (
        <div
            className={cn(
                'mx-auto grid max-w-7xl grid-cols-1 gap-4 md:multi-["auto-rows-[18rem];grid-cols-3"]',
                className
            )}
        >
            {children}
        </div>
    )
}

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon
}: {
    className?: string
    title?: string | React.ReactNode
    description?: string | React.ReactNode
    header?: React.ReactNode
    icon?: React.ReactNode
}) => {
    return (
        <div
            className={cn(
                "group/bento shadow-input border-dark/[0.2] row-span-1 flex flex-col justify-between space-y-4 rounded-3xl border bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
                className
            )}
        >
            {header}
            <div className='transition duration-200 group-hover/bento:translate-x-2'>
                <div className='mb-2 mt-2 flex flex-row items-center gap-2 font-sans font-bold text-neutral-600 dark:text-neutral-200'>
                    {icon} <p>{title}</p>
                </div>
                <div className='font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300'>
                    {description}
                </div>
            </div>
        </div>
    )
}
