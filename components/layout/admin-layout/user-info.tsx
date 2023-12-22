"use client"
import { useIsClient } from "usehooks-ts"
import { Skeleton } from "@nextui-org/react"

import { UserCard } from "@/components/business"
import { Col } from "@/components/common"

export default function UserInfo() {
    const isClient = useIsClient()

    if (!isClient) {
        return (
            <Col fullWidth space={3} className='max-w-[300px]'>
                <Skeleton className='flex rounded-full w-10 h-10 lg:w-12 lg:h-12' />
                <Skeleton className='h-3 w-14 lg:w-20 rounded-lg' />
                <Skeleton className='h-3 w-10 lg:w-12 rounded-lg' />
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
