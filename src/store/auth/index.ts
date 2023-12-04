import toast from "react-hot-toast";
import { create } from "zustand";

import { immer } from "zustand/middleware/immer";

import { useAsyncStore, createSelectors } from "@/src/utils/store";
import { fetchLogin } from "~/service/api";
import { useRouteActions, useRouteStore } from "~/store/route";
import { parseJwtPayload } from "~/utils/common";
import { useRouterPush } from "~/utils/router";
import { localStg } from "~/utils/storage";
import { getToken, getUserInfo, clearAuthStorage } from "./helpers";

interface AuthState {
	/** 用户信息 */
	userInfo: Auth.UserInfo;
	/** 用户token */
	token: string;
	/** 登录的加载状态 */
	isLoading: boolean;
}

const initialAuthState: AuthState = {
	userInfo: getUserInfo(),
	token: getToken(),
	isLoading: false
};

export const useAuthStore = create<AuthState>()(immer(() => ({ ...initialAuthState })));

export function useAuthActions() {
	const { routerPush, routerBack, toHome, toLogin, toRegister, toRedirect } = useRouterPush();
	// const { initAuthRoute } = useRouteActions();
	// const isInitAuthRoute = useRouteStore((state) => state.isInitAuthRoute);

	function setIsLoading(isLoading: boolean) {
		useAuthStore.setState((state) => {
			state.isLoading = isLoading;
		});
	}
	function setUserInfo(userInfo: Auth.UserInfo) {
		useAuthStore.setState((state) => {
			state.userInfo = userInfo;
		});
	}
	function setToken(token: string) {
		useAuthStore.setState((state) => {
			state.token = token;
		});
	}

	/** 是否登录 */
	function isLogin() {
		return Boolean(useAuthStore.getState().token);
	}

	function resetAuthStore() {
		clearAuthStorage();
		useAuthStore.setState(() => ({
			...initialAuthState
		}));

		routerPush("/");
	}

	// /**
	//  * 处理登录后成功或失败的逻辑
	//  * @param backendToken - 返回的token
	//  */
	// async function handleActionAfterLogin(backendToken: ApiAuth.Token) {
	// 	const loginSuccess = await loginByToken(backendToken);

	// 	if (loginSuccess) {
	// 		await initAuthRoute();

	// 		// 跳转登录后的地址
	// 		toRedirect();

	// 		// 登录成功弹出欢迎提示
	// 		if (isInitAuthRoute) {
	// 			toast.success("登录成功");
	// 			// window.$notification?.success({
	// 			// 	title: "登录成功!",
	// 			// 	content: `欢迎回来，${this.userInfo.userName}!`,
	// 			// 	duration: 3000
	// 			// });
	// 		}

	// 		return;
	// 	}
	// 	// 不成功则重置状态
	// 	resetAuthStore();
	// }

	// /**
	//  * 根据token进行登录
	//  * @param backendToken - 返回的token
	//  */
	// async function loginByToken(backendToken: ApiAuth.Token) {
	// 	let successFlag = false;

	// 	// 先把token存储到缓存中(后面接口的请求头需要token)
	// 	const { token, refreshToken } = backendToken;
	// 	localStg.set("token", `Bearer ${token}`);
	// 	localStg.set("refreshToken", refreshToken);

	// 	// 获取用户信息
	// 	const payload = parseJwtPayload(token);

	// 	if (payload) {
	// 		const { iat, exp, userInfo } = payload;
	// 		const now = Math.floor(new Date().getTime() / 1000);

	// 		if (iat <= now && now < exp) {
	// 			// 成功后把用户信息存储到缓存中
	// 			localStg.set("userInfo", userInfo);

	// 			// 更新状态
	// 			setUserInfo(userInfo);
	// 			setToken(token);

	// 			successFlag = true;
	// 		}
	// 	}

	// 	return successFlag;
	// }

	/**
	 * 登录
	 * @param userName - 用户名
	 * @param password - 密码
	 */
	async function login(model: Auth.LoginForm) {
		setIsLoading(true);
		const { data } = await fetchLogin(model);
		// if (data) {
		// 	await handleActionAfterLogin(data);
		// }
		setIsLoading(false);
	}
	return {
		resetAuthStore,
		login,
		setIsLoading,
		setUserInfo,
		setToken,
		isLogin
	};
}

/** Reset the auth state */
// export function resetAuthStore() {
// 	// const { toHome } = useRouterPush();

// 	clearAuthStorage();
// 	useAuthStore.setState(() => ({
// 		...initialAuthState
// 	}));

// 	// toHome();
// }

// 	/**
// 	 * 注册
// 	 * @param userName - 用户名
// 	 * @param password - 密码
// 	 */
// 	async register(model: Auth.RegisterForm) {
// 	this.loginLoading = true;
// 	const { error } = await fetchRegister(model);
// 	this.loginLoading = false;
// 	return error === null;
// }

//     /**
//      * 更换用户权限(切换账号)
//      * @param userRole
//      */
// export async function updateUserRole(userRole: Auth.RoleType) {
// 	const { resetRouteStore, initAuthRoute } = useRouteStore();

// 	const accounts: Record<Auth.RoleType, { userName: string; password: string }> = {
// 	super: {
// 		userName: 'Super',
// 		password: 'super123'
// 	},
// 	admin: {
// 		userName: 'Admin',
// 		password: 'admin123'
// 	},
// 	user: {
// 		userName: 'User01',
// 		password: 'user01123'
// 	}
// 	};
// 	const { userName, password } = accounts[userRole];
// 	const { data } = await fetchLogin(userName, password);
// 	if (data) {
// 	await this.loginByToken(data);
// 	resetRouteStore();
// 	initAuthRoute();
// 	}
// }
// // export function setValueHandler(value: number) {
// // 	useProgressStore.setState((state) => {
// // 		state.value = value;
// // 	});
// // }

// // export function showProgress() {
// // 	useProgressStore.setState(() => ({
// // 		isShow: true,
// // 		color: "primary",
// // 		value: 0
// // 	}));
// // }

// // export function hideProgress() {
// // 	setTimeout(() => {
// // 		useProgressStore.setState((state) => {
// // 			state.isShow = false;
// // 		});
// // 	}, 700);
// // }

// // export function successProgress() {
// // 	useProgressStore.setState((state) => {
// // 		(state.color = "success"), (state.value = 100);
// // 	});
// // 	hideProgress();
// // }

// // export function errorProgress() {
// // 	useProgressStore.setState((state) => {
// // 		(state.color = "danger"), (state.value = 100);
// // 	});
// // 	hideProgress();
// // }
