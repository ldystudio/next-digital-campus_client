import { request } from "../request"

const VIEW_URL = "/auth"

/**
 * 获取验证码
 * @param email - 邮箱号
 * @returns - 返回boolean值表示是否发送成功
 */
export function fetchSmtpCode(email: string, traceId: string) {
    return request.post<boolean>(`${VIEW_URL}/email_captcha/`, { email, traceId })
}

/**
 * 登录
 * @param model - 登录表单
 * @returns - 返回token和refreshToken
 */
export function fetchLogin(model: Auth.LoginForm) {
    return request.post<ApiAuth.Token>(`${VIEW_URL}/login/`, { ...model })
}

/**
 * 邮箱登录
 * @param model 邮箱登录表单
 * @returns - 返回token和refreshToken
 */
export function fetchEmailLogin(model: Auth.EmailLoginForm) {
    return request.post<ApiAuth.Token>(`${VIEW_URL}/login/`, {
        ...model,
        type: "emailLogin",
        // Django登录占位符，随机生成用户名和密码，后续不使用
        username: `${Math.random().toString(36).slice(-8)}`,
        password: `${Math.random().toString(36).slice(-8)}`
    })
}

/**
 * 退出登录
 * @param refresh - refreshToken
 * @returns - 返回null
 */
export function fetchLogout(refresh: string) {
    return request.post<null>(`${VIEW_URL}/logout/`, { refresh })
}

/**
 * 注册
 * @param model - 注册表单
 * @returns - 返回null
 */
export function fetchRegister(model: Auth.RegisterForm) {
    return request.post<null>(`${VIEW_URL}/register/`, { ...model })
}

/**
 * 刷新token
 * @param refreshToken
 * @returns - 返回token
 */
export function fetchUpdateToken(refresh: string) {
    return request.post<ApiAuth.Token>(`${VIEW_URL}/refresh/`, { refresh })
}

export function fetchTest() {
    return request.get<null>("iam/1/")
}
