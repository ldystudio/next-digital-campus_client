"use client";
import { useMemo } from "react";

import { useIsClient } from "usehooks-ts";
import * as adventurer from "@dicebear/adventurer";
import { createAvatar } from "@dicebear/core";
import {
	Button,
	NavbarItem,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Skeleton,
	User
} from "@nextui-org/react";

import { UserCard } from "@/components/business";
import { Col, Row } from "@/components/common";
import { useAuthAction, useAuthState } from "~/store/modules/auth";
import { useRouterPush } from "~/utils/router";

export default function AuthNavbarItem() {
	const { toLogin, toRegister } = useRouterPush();
	const { isLogin } = useAuthAction();
	const { avatar, userName, userRole, realName, email } = useAuthState().userInfo;
	const isClient = useIsClient();

	const avatarImage = useMemo(() => {
		return avatar ? createAvatar(adventurer, { seed: avatar }).toDataUriSync() : undefined;
	}, [avatar]);

	if (!isClient) {
		return (
			<Row fullWidth space={3} className='max-w-[300px]'>
				<div>
					<Skeleton className='flex rounded-full w-12 h-12' />
				</div>
				<Col fullWidth items='start' space={2}>
					<Skeleton className='h-3 w-2/6 rounded-lg' />
					<Skeleton className='h-3 w-1/6 rounded-lg' />
				</Col>
			</Row>
		);
	}

	return (
		<NavbarItem className='hidden md:flex gap-4' suppressHydrationWarning>
			{isLogin() ? (
				<Popover showArrow placement='bottom'>
					<PopoverTrigger>
						<User
							name={userName}
							description={userRole}
							avatarProps={{
								isBordered: true,
								color:
									userRole === "admin"
										? "secondary"
										: userRole === "teacher"
										? "primary"
										: "default",
								src: avatarImage,
								name: userName
							}}
							className='ml-1'
							classNames={{ wrapper: "ml-1" }}
						/>
					</PopoverTrigger>
					<PopoverContent className='p-1'>
						<UserCard
							name={userName}
							role={userRole}
							description='Full-stack developer, @getnextui lover she/her'
							avatar={avatarImage}
							realName={realName}
							email={email}
						/>
					</PopoverContent>
				</Popover>
			) : (
				<>
					<Button variant='flat' onClick={() => toLogin()}>
						登录
					</Button>
					<Button variant='flat' color='primary' onClick={() => toRegister()}>
						注册
					</Button>
				</>
			)}
		</NavbarItem>
	);
}
