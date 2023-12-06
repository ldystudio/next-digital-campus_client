"use client";
import { useMemo } from "react";

import * as adventurer from "@dicebear/adventurer";
import { createAvatar } from "@dicebear/core";
import { Avatar, Button, NavbarItem } from "@nextui-org/react";

import { useAuthAction, useAuthState } from "~/store/modules/auth";
import { useRouterPush } from "~/utils/router";

export default function AuthNavbarItem() {
	const { toLogin, toRegister } = useRouterPush();
	const { isLogin } = useAuthAction();
	const { avatar, userName, userRole } = useAuthState().userInfo;

	const avatarImage = useMemo(() => {
		return avatar ? createAvatar(adventurer, { seed: avatar }).toDataUriSync() : undefined;
	}, [avatar]);

	return (
		<NavbarItem className='hidden md:flex gap-4'>
			{isLogin() ? (
				<Avatar
					isBordered
					color={
						userRole === "admin"
							? "secondary"
							: userRole === "teacher"
							? "primary"
							: "default"
					}
					src={avatarImage}
					name={userName}
					className='ml-1'
				/>
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
