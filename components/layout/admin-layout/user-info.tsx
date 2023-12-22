"use client"

import { Skeleton } from "@nextui-org/react"
import { useIsClient } from "usehooks-ts"

import { UserCard } from "@/components/business"
import { Col } from "@/components/common"

export default function UserInfo() {
    const isClient = useIsClient()

    if (!isClient) {
        return (
            <Col fullWidth space={3} className='max-w-[300px]'>
                <Skeleton className='flex h-10 w-10 rounded-full lg:h-12 lg:w-12' />
                <Skeleton className='h-3 w-14 rounded-lg lg:w-20' />
                <Skeleton className='h-3 w-10 rounded-lg lg:w-12' />
            </Col>
        )
    }

    return (
        <UserCard
            description='Full-stack developer, @getnextui lover she/her'
            placement='top'
            avatarProps={{
                size: "lg"
            }}
            classNames={{
                base: "flex-col",
                wrapper: "items-center gap-2",
                name: "text-small",
                description: "text-tiny text-foreground-400"
            }}
        />
    )
}
