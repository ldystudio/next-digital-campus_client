"use client";
import { Button } from "@nextui-org/react";

import { localStg } from "@/src/utils/storage";
import { fetchUpdateToken } from "~/service/api";
import { useAuthState, useAuthAction } from "~/store/modules/auth";
import Motion from "./motion";

export default function Test() {
	const { userInfo } = useAuthState();
	const { setUserInfo, resetAuthStore } = useAuthAction();
	return (
		<>
			<section>
				<Button
					onPress={() =>
						setUserInfo({ userId: "100", userName: "test", userRole: "admin" })
					}
				>
					设置
				</Button>
				<Button onPress={() => resetAuthStore()}>重置</Button>
				<p>{userInfo.userId}</p>
				<p>{userInfo.userName}</p>
				<p>{userInfo.userRole}</p>
			</section>
			<section>
				{/* <Button onPress={() => fetchUpdateToken(refresh)}>测试</Button> */}
				<Motion />
			</section>
		</>
	);
}
