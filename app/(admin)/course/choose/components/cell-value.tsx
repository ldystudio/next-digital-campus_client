import React from "react"

export type CellValueProps = React.HTMLAttributes<HTMLDivElement> & {
    label: string
    value: string | number | React.ReactNode
}

const CellValue = React.forwardRef<HTMLDivElement, CellValueProps>(
    ({ label, value, children, ...props }, ref) => (
        <div
            ref={ref}
            className={`flex w-full items-center justify-between py-2`}
            {...props}
        >
            <div className='text-small text-default-500'>{label}</div>
            <div className='text-small font-medium'>{value || children}</div>
        </div>
    )
)

CellValue.displayName = "CellValue"

export default CellValue
