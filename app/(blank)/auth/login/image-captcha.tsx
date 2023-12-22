"use client"

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"

import { Image, Popover, PopoverContent, PopoverTrigger, Skeleton } from "@nextui-org/react"

interface ImageCaptchaProps {
    generateTraceId: () => string
    setTraceId: Dispatch<SetStateAction<string>>
    captchaURL: string
}

export default function ImageCaptcha({
    generateTraceId,
    setTraceId,
    captchaURL
}: ImageCaptchaProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [showPopover, setShowPopover] = useState(false)
    const [firstLoad, setFirstLoad] = useState(true)

    const timerIdRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (!isLoaded && !firstLoad) {
            timerIdRef.current = setTimeout(() => {
                setShowPopover(true)
            }, 1000)
        } else {
            if (timerIdRef.current) {
                clearTimeout(timerIdRef.current)
            }
            setShowPopover(false)
        }
    }, [firstLoad, isLoaded])

    const handleImageLoad = () => {
        setIsLoaded(true)
        setFirstLoad(false)
    }

    const handleImageClick = () => {
        setTraceId(generateTraceId())
        setIsLoaded(false)
    }

    return (
        <Skeleton isLoaded={isLoaded} className='h-[41px] w-[109px] rounded-lg'>
            <Popover isOpen={showPopover} radius='sm' showArrow>
                <PopoverTrigger>
                    <Image
                        src={captchaURL}
                        alt='验证码'
                        draggable='false'
                        onClick={handleImageClick}
                        onLoad={handleImageLoad}
                    />
                </PopoverTrigger>
                <PopoverContent>
                    <span className='text-danger'>验证码刷新频率过快</span>
                </PopoverContent>
            </Popover>
        </Skeleton>
    )
}
