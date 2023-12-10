import { useRouter, usePathname, useSearchParams } from "next/navigation";

import NProgress from "nprogress";

import { useRouteAction, useRouteState } from "~/store/modules/route";

let oldPathname = "";
/**
 * 路由跳转
 */
export function useRouterPush() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	// const { previousRoutePath } = useRouteState();
	// const { setPreviousRoutePath } = useRouteAction();

	/**
	 * 路由跳转
	 * @param to - 需要跳转的路由
	 * @param redirect - 重定向地址
	 * @param newTab - 是否在新的浏览器Tab标签打开
	 */
	function routerPush(to: AuthRoute.RoutePath, redirect?: AuthRoute.RoutePath, newTab?: boolean) {
		if (newTab) {
			window.open(to, "_blank");
			return Promise.resolve();
		}

		if (oldPathname && to !== oldPathname) {
			NProgress.configure({ showSpinner: false }).start();
		}
		oldPathname = to;

		if (redirect) {
			to = `${to}?redirect=${redirect}` as AuthRoute.RoutePath;
		}

		router.push(to);
	}

	/** 返回上一级路由 */
	function routerBack() {
		router.back();
	}

	/**
	 * 跳转首页
	 * @param newTab - 在新的浏览器标签打开
	 */
	function toHome(newTab = false) {
		routerPush("/", undefined, newTab);
	}

	/**
	 * 跳转登录页面
	 * @param redirectUrl - 重定向地址(登录成功后跳转的地址),默认undefined表示取当前地址为重定向地址
	 */
	function toLogin(redirectUrl?: AuthRoute.RoutePath) {
		const redirect = redirectUrl || (pathname as AuthRoute.RoutePath | undefined);

		routerPush("/auth/login", redirect);
	}
	/**
	 * 跳转注册页面
	 */
	function toRegister() {
		routerPush("/auth/register", "/auth/login");
	}

	/**
	 * 登录成功后跳转重定向的地址
	 */
	function toRedirect() {
		const redirect = searchParams?.get("redirect") as AuthRoute.RoutePath | null;

		redirect ? routerPush(redirect) : toHome();
	}

	return {
		routerPush,
		routerBack,
		toHome,
		toLogin,
		toRegister,
		toRedirect
	};
}
