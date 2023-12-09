import { useRouter, usePathname, useSearchParams } from "next/navigation";

/**
 * 路由跳转
 */
export function useRouterPush() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	/**
	 * 路由跳转
	 * @param to - 需要跳转的路由
	 * @param newTab - 是否在新的浏览器Tab标签打开
	 */
	function routerPush(to: string, newTab = false) {
		if (newTab) {
			window.open(to, "_blank");
			return Promise.resolve();
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
		routerPush("/", newTab);
	}

	/**
	 * 跳转登录页面
	 * @param redirectUrl - 重定向地址(登录成功后跳转的地址),默认undefined表示取当前地址为重定向地址
	 */
	function toLogin(redirectUrl?: string) {
		const redirect = redirectUrl || pathname;

		routerPush(`/auth/login?redirect=${redirect}`);
	}
	/**
	 * 跳转注册页面
	 */
	function toRegister() {
		routerPush("/auth/register?redirect=/auth/login");
	}

	/**
	 * 登录成功后跳转重定向的地址
	 */
	function toRedirect() {
		const redirect = searchParams?.get("redirect");

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
