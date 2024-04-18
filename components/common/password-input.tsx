"use client"

import { useState } from "react"

import { Input, InputProps } from "@nextui-org/input"

import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/common/icons"

export function PasswordInput(props: InputProps) {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => setIsVisible(!isVisible)

    return (
        <Input
            {...props}
            endContent={
                <button type='button' onClick={toggleVisibility}>
                    {isVisible ? (
                        <EyeSlashFilledIcon className='pointer-events-none text-2xl text-default-400' />
                    ) : (
                        <EyeFilledIcon className='pointer-events-none text-2xl text-default-400' />
                    )}
                </button>
            }
            type={isVisible ? "text" : "password"}
        />
    )
}
