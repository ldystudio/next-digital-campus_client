"use client";
import { Button } from "@nextui-org/react";

import { notice } from "@/components/common";

import { localStg } from "@/src/utils/storage";
import { fetchUpdateToken } from "~/service/api";
import { useAuthStateInComponent, useAuthAction } from "~/store/modules/auth";
import { useRouteStateInComponent, useRouteAction } from "~/store/modules/route";

export default function Test() {
	const { userInfo, isLoading, token } = useAuthStateInComponent();
	const { setUserInfo, resetAuthStore } = useAuthAction();
	const { isInitAuthRoute, menus, searchMenus } = useRouteStateInComponent();
	const { setIsInitAuthRoute, resetRouteStore } = useRouteAction();

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
				<p>userInfo: {JSON.stringify(userInfo)}</p>
				<p>isLoading: {`${isLoading}`}</p>
				<p>token: {token}</p>
			</section>
			<section>
				<Button
					onPress={() =>
						notice.info({
							title: "欢迎回来",
							description: "Admin"
						})
					}
				>
					info消息
				</Button>
				<Button
					onPress={() => {
						notice.success({ description: "success" });
					}}
				>
					success消息
				</Button>
				<Button
					onPress={() => {
						notice.warning({ description: "warning" });
					}}
				>
					warning消息
				</Button>
				<Button
					onPress={() => {
						notice.error({ description: "error" });
					}}
				>
					error消息
				</Button>
			</section>
			{/* <section>
				<p>isInitAuthRoute: {`${isInitAuthRoute}`}</p>
				<p>menus: {`${JSON.stringify(menus)}`}</p>
				<p>searchMenus: {`${JSON.stringify(searchMenus)}`}</p>
				<Button onPress={() => setIsInitAuthRoute(!isInitAuthRoute)}>转换</Button>
				<Button onPress={() => resetRouteStore()}>重置</Button>
			</section> */}
		</>
	);
}
