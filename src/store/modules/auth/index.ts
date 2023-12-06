import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { notice } from "@/components/common";
import { useAppSelector, useAppDispatch } from "~/hooks/common";
import { fetchLogin } from "~/service/api";
import store from "~/store";
import { useRouteStateInFunction, useRouteAction } from "~/store/modules/route";
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

const initialState: AuthState = {
	userInfo: getUserInfo(),
	token: getToken(),
	isLoading: false
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		resetAuthStore() {
			return initialState;
		},
		setIsLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
		setUserInfo(state, action: PayloadAction<Auth.UserInfo>) {
			state.userInfo = action.payload;
		},
		setToken(state, action: PayloadAction<string>) {
			state.token = action.payload;
		}
	}
});

export default authSlice.reducer;

export function useAuthStateInComponent() {
	return { ...useAppSelector((state) => state.auth) };
}

export function useAuthStateInFunction() {
	return { ...store.getState().auth };
}

export function useAuthAction() {
	const { routerPush, routerBack, toHome, toLogin, toRegister, toRedirect } = useRouterPush();
	const { initAuthRoute } = useRouteAction();
	const { token, userInfo } = useAuthStateInFunction();
	const dispatch = useAppDispatch();

	function resetAuthStore() {
		clearAuthStorage();
		dispatch(authSlice.actions.resetAuthStore());
		routerPush("/");
	}
	function setIsLoading(isLoading: boolean) {
		dispatch(authSlice.actions.setIsLoading(isLoading));
	}
	function setUserInfo(userInfo: Auth.UserInfo) {
		dispatch(authSlice.actions.setUserInfo(userInfo));
	}
	function setToken(token: string) {
		dispatch(authSlice.actions.setToken(token));
	}

	/** 是否登录 */
	function isLogin() {
		return Boolean(token);
	}

	/**
	 * 处理登录后成功或失败的逻辑
	 * @param backendToken - 返回的token
	 */
	async function handleActionAfterLogin(backendToken: ApiAuth.Token) {
		const loginSuccess = await loginByToken(backendToken);

		if (loginSuccess) {
			await initAuthRoute();

			// 跳转登录后的地址
			toRedirect();

			const isInitAuthRoute = store.getState().route.isInitAuthRoute;
			// 登录成功弹出欢迎提示
			if (isInitAuthRoute) {
				notice.success({
					title: "登录成功!",
					description: `欢迎回来，${userInfo.userName}!`
				});
			}

			return;
		}

		notice.error({ title: "登录失败", description: "请稍后再试~" });
		// 不成功则重置状态
		resetAuthStore();
	}

	/**
	 * 根据token进行登录
	 * @param backendToken - 返回的token
	 */
	async function loginByToken(backendToken: ApiAuth.Token) {
		let successFlag = false;

		// 先把token存储到缓存中(后面接口的请求头需要token)
		const { token, refreshToken } = backendToken;
		localStg.set("token", `Bearer ${token}`);
		localStg.set("refreshToken", refreshToken);

		// 获取用户信息
		const payload = parseJwtPayload(token);

		if (payload) {
			const { iat, exp, userInfo } = payload;
			const now = Math.floor(new Date().getTime() / 1000);

			if (iat <= now && now < exp) {
				// 成功后把用户信息存储到缓存中
				localStg.set("userInfo", userInfo);

				// 更新状态
				setUserInfo(userInfo);
				setToken(token);

				successFlag = true;
			}
		}

		return successFlag;
	}

	/**
	 * 登录
	 * @param userName - 用户名
	 * @param password - 密码
	 */
	async function login(model: Auth.LoginForm) {
		setIsLoading(true);

		const { data } = await fetchLogin(model);

		if (data) await handleActionAfterLogin(data);

		setIsLoading(false);
	}

	return {
		resetAuthStore,
		setIsLoading,
		setUserInfo,
		setToken,
		login,
		isLogin
	};
}
