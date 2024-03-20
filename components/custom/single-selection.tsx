import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger
} from "@nextui-org/react"

import { ChevronDownIcon } from "@/components/common"

interface SingleSelectionProps {
    columns: Columns
    selectedValue: string
    selectedFilterKeys: Set<string>
    setSelectedFilterKeys: (keys: Set<string>) => void
    className?: string
}

export default function SingleSelection({
    columns,
    selectedValue,
    selectedFilterKeys,
    setSelectedFilterKeys,
    className
}: SingleSelectionProps) {
    return (
        <div className={className}>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant='flat'
                        endContent={<ChevronDownIcon className='text-small' />}
                    >
                        {selectedValue}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label='Single selection example'
                    variant='flat'
                    disallowEmptySelection
                    selectionMode='single'
                    selectedKeys={selectedFilterKeys}
                    // @ts-expect-error：((keys: Selection) => any)类型定义错误，keys参数类型为Selection
                    onSelectionChange={setSelectedFilterKeys}
                    items={columns}
                >
                    {(item) => <DropdownItem key={item.uid}>{item.name}</DropdownItem>}
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
