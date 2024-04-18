"use client"

import { Skeleton } from "@nextui-org/skeleton"

import { UserCard } from "@/components/business/user-card"
import { Col } from "@/components/common/dimension"
import { useClientServerCheck } from "~/hooks/common"

export default function UserInfo() {
    const { isServer } = useClientServerCheck()

    if (isServer) {
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
