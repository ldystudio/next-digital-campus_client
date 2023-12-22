import { useMemo } from "react"

import toast from "react-hot-toast"
import * as adventurer from "@dicebear/adventurer"
import { createAvatar } from "@dicebear/core"
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverProps,
    AvatarProps,
    User,
    UserProps
} from "@nextui-org/react"

import { fetchLogout } from "~/service/api"
import { useAuthAction, useAuthState } from "~/store/modules/auth"
import { useRouteAction } from "~/store/modules/route"
import { localStg } from "~/utils/storage"
import { Col, Row } from "@/components/common"

interface UserCardProps {
    description?: string
    avatarProps?: AvatarProps
    placement?: PopoverProps["placement"]
    className?: string
    classNames?: UserProps["classNames"]
}
export function UserCard({
    description,
    placement = "bottom",
    avatarProps,
    className,
    classNames
}: UserCardProps) {
    const { resetAuthStore } = useAuthAction()
    const { resetRouteStore } = useRouteAction()
    const { avatar, userName, userRole, realName, email } = useAuthState().userInfo

    const avatarImage = useMemo(() => {
        return avatar ? createAvatar(adventurer, { seed: avatar }).toDataUriSync() : undefined
    }, [avatar])

    async function logout() {
        const refreshToken = localStg.get("refreshToken") || ""
        const { error } = await fetchLogout(refreshToken)

        if (error && error.type === "axios") {
            return
        }

        await resetRouteStore()
        await resetAuthStore()
        toast.success("退出成功")
    }

    return (
        <Popover showArrow placement={placement}>
            <PopoverTrigger>
                <User
                    name={userName}
                    description={userRole}
                    avatarProps={{
                        ...avatarProps,
                        src: avatarImage,
                        name: userName,
                        color:
                            userRole === "admin"
                                ? "secondary"
                                : userRole === "teacher"
                                  ? "primary"
                                  : "default"
                    }}
                    className={className}
                    {...{ classNames }}
                />
            </PopoverTrigger>
            <PopoverContent className='p-1'>
                <Card shadow='none' className='w-[300px] border-none bg-transparent'>
                    <CardHeader className='justify-between'>
                        <Row space={3}>
                            <Avatar
                                isBordered
                                radius='full'
                                size='md'
                                src={avatarImage}
                                color={
                                    userRole === "admin"
                                        ? "secondary"
                                        : userRole === "teacher"
                                          ? "primary"
                                          : "default"
                                }
                                name={userName}
                            />
                            <Col items='start' justify='center'>
                                <p className='text-small font-semibold leading-none text-default-600'>
                                    {realName ? realName : userName}
                                </p>
                                <p className='text-small tracking-tight text-default-500'>
                                    {email}
                                </p>
                            </Col>
                        </Row>
                        <Button
                            color='danger'
                            radius='full'
                            size='sm'
                            variant='solid'
                            onClick={async () => {
                                await logout()
                            }}
                        >
                            退出
                        </Button>
                    </CardHeader>
                    <CardBody className='px-3 py-0'>
                        <p className='text-small pl-px text-default-500'>
                            {description ?? "写段描述介绍自己吧~"}
                        </p>
                    </CardBody>
                    <CardFooter className='gap-3'>
                        <p>
                            <span className='font-semibold text-primary text-small'>4</span>
                            <span className=' text-default-500 text-small ml-1'>任务</span>
                        </p>
                        <p>
                            <span className='font-semibold text-danger text-small'>97</span>
                            <span className='text-default-500 text-small ml-1'>消息</span>
                        </p>
                    </CardFooter>
                </Card>
            </PopoverContent>
        </Popover>
    )
}
