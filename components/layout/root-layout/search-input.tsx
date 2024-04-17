"use client"

import { useState } from "react"

import { Input, Kbd } from "@nextui-org/react"

import { SearchIcon } from "@/components/common/icons"

export default function SearchInput() {
    const [value, setValue] = useState("")
    return (
        <Input
            aria-label='Search'
            classNames={{
                inputWrapper: "bg-default-200",
                input: "text-sm"
            }}
            endContent={
                <Kbd className='hidden lg:inline-block' keys={["command"]}>
                    K
                </Kbd>
            }
            labelPlacement='outside'
            placeholder='Search...'
            startContent={
                <SearchIcon className='pointer-events-none shrink-0 text-base text-default-400' />
            }
            type='search'
            value={value}
            onValueChange={setValue}
        />
    )
}
