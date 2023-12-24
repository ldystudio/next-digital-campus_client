import { request } from "../request"

const CONTROLLER = "/auth"

/**
 * 获取验证码
 * @param email - 邮箱号
 * @returns - 返回boolean值表示是否发送成功
 */
export function fetchSmtpCode(email: string, traceId: string) {
    return request.post<boolean>(`${CONTROLLER}/email_captcha/`, { email, traceId })
}

/**
 * 登录
 * @param model - 登录表单
 * @returns - 返回token和refreshToken
 */
export function fetchLogin(model: Auth.LoginForm) {
    return request.post<ApiAuth.Token>(`${CONTROLLER}/login/`, { ...model })
}

/**
 * 邮箱登录
 * @param model 邮箱登录表单
 * @returns - 返回token和refreshToken
 */
export function fetchEmailLogin(model: Auth.EmailLoginForm) {
    return request.post<ApiAuth.Token>(`${CONTROLLER}/login/`, {
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
    return request.post<null>(`${CONTROLLER}/logout/`, { refresh })
}

/**
 * 注册
 * @param model - 注册表单
 * @returns - 返回null
 */
export function fetchRegister(model: Auth.RegisterForm) {
    return request.post<null>(`${CONTROLLER}/register/`, { ...model })
}

/**
 * 刷新token
 * @param refreshToken
 * @returns - 返回token
 */
export function fetchUpdateToken(refresh: string) {
    return request.post<ApiAuth.Token>(`${CONTROLLER}/refresh/`, { refresh })
}

/**
 * 获取用户信息
 * @returns - 返回用户信息
 */
export function fetchUserInfo(id: string) {
    return request.get<ApiUserManagement.User>(`${CONTROLLER}/user/${id}/`)
}
