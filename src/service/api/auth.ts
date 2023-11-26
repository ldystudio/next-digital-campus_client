import { request } from "../request";

/**
 * 获取验证码
 * @param email - 邮箱号
 * @returns - 返回boolean值表示是否发送成功
 */
export function fetchSmtpCode(email: string, traceId: string) {
	return request.post<boolean>("auth/email_captcha/", { email, traceId });
}

/**
 * 登录
 * @param model
 * @returns
 */
export function fetchLogin(model: Auth.LoginForm) {
	return request.post<ApiAuth.Token>("auth/login/", { ...model });
}

/**
 * 退出登录
 * @param refresh 刷新token
 * @returns null
 */
export function fetchLogout(refresh: string) {
	return request.post<null>("auth/logout/", { refresh });
}

/**
 * 注册
 */
export function fetchRegister(model: Auth.RegisterForm) {
	return request.post<null>("auth/register/", { ...model });
}

/**
 * 刷新token
 * @param refreshToken
 */
export function fetchUpdateToken(refresh: string) {
	return request.post<ApiAuth.Token>("auth/refresh/", { refresh });
}

export function fetchTest() {
	return request.get<null>("iam/1/");
}
