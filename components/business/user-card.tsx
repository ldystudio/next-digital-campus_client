import toast from "react-hot-toast"
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react"

import { fetchLogout } from "~/service/api"
import { useAuthAction } from "~/store/modules/auth"
import { useRouteAction } from "~/store/modules/route"
import { localStg } from "~/utils/storage"

interface UserCardProps {
    avatar?: string
    name: string
    description: string
    role: string
    realName?: string
    email?: string
}
export function UserCard({ avatar, name, description, role, realName, email }: UserCardProps) {
    const { resetAuthStore } = useAuthAction()
    const { resetRouteStore } = useRouteAction()

    async function logout() {
        const refreshToken = localStg.get("refreshToken") || ""
        const { error } = await fetchLogout(refreshToken)

        if (error && error.type === "axios") {
            toast.error("退出失败")
            return
        }

        await resetRouteStore()
        await resetAuthStore()
        toast.success("退出成功")
    }

    return (
        <Card shadow='none' className='max-w-[300px] border-none bg-transparent'>
            <CardHeader className='justify-between'>
                <div className='flex gap-3'>
                    <Avatar
                        isBordered
                        radius='full'
                        size='md'
                        src={avatar}
                        color={
                            role === "admin"
                                ? "secondary"
                                : role === "teacher"
                                  ? "primary"
                                  : "default"
                        }
                        name={name}
                    />
                    <div className='flex flex-col items-start justify-center'>
                        <h4 className='text-small font-semibold leading-none text-default-600'>
                            {realName ? realName : name}
                        </h4>
                        <h5 className='text-small tracking-tight text-default-500'>{email}</h5>
                    </div>
                </div>
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
                    {description}
                    <span aria-label='confetti' role='img'>
                        🎉
                    </span>
                </p>
            </CardBody>
            <CardFooter className='gap-3'>
                <div className='flex gap-1'>
                    <p className='font-semibold text-primary text-small'>4</p>
                    <p className=' text-default-500 text-small'>任务</p>
                </div>
                <div className='flex gap-1'>
                    <p className='font-semibold text-danger text-small'>97</p>
                    <p className='text-default-500 text-small'>消息</p>
                </div>
            </CardFooter>
        </Card>
    )
}
