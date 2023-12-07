import { useState } from "react";

import toast from "react-hot-toast";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

import { fetchLogout } from "~/service/api";
import { useAuthAction } from "~/store/modules/auth";
import { useRouteAction } from "~/store/modules/route";
import { localStg } from "~/utils/storage";

interface UserCardProps {
	avatar?: string;
	name: string;
	description: string;
	role: string;
}
export function UserCard({ avatar, name, description, role }: UserCardProps) {
	const { resetAuthStore } = useAuthAction();
	const { resetRouteStore } = useRouteAction();

	async function logout() {
		const refreshToken = localStg.get("refreshToken") || "";
		await fetchLogout(refreshToken);

		resetRouteStore();
		resetAuthStore();
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
					/>
					<div className='flex flex-col items-start justify-center'>
						<h4 className='text-small font-semibold leading-none text-default-600'>
							{name}
						</h4>
						<h5 className='text-small tracking-tight text-default-500'>@zoeylang</h5>
					</div>
				</div>
				<Button
					color='danger'
					radius='full'
					size='sm'
					variant='solid'
					onClick={async () => {
						await logout();
						toast.success("退出成功");
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
	);
}
