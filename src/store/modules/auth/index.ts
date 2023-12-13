import { setCookie } from "cookies-next"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { notice } from "@/components/common"
import { useAppSelector, useAppDispatch } from "~/hooks/common"
import { fetchEmailLogin, fetchLogin, fetchRegister } from "~/service/api"
import { getRouteState, getAuthState } from "~/store"
import { useRouteAction } from "~/store/modules/route"
import { parseJwtPayload } from "~/utils/common"
import { useRouterPush } from "~/utils/router"
import { localStg } from "~/utils/storage"
import { getToken, getUserInfo, clearAuthStorage, emptyInfo } from "./helpers"

interface AuthState {
    /** 用户信息 */
    userInfo: Auth.UserInfo
    /** 用户token */
    token: string
    /** 登录的加载状态 */
    isLoading: boolean
}

const initialState: AuthState = {
    userInfo: getUserInfo(),
    token: getToken(),
    isLoading: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuthStore() {
            return {
                ...initialState,
                userInfo: emptyInfo,
                token: ""
            }
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            return { ...state, isLoading: action.payload }
        },
        setUserInfo(state, action: PayloadAction<Auth.UserInfo>) {
            return { ...state, userInfo: action.payload }
        },
        setToken(state, action: PayloadAction<string>) {
            return { ...state, token: action.payload }
        }
    }
})

export default authSlice.reducer

export function useAuthState() {
    return useAppSelector((state) => state.auth)
}

export function useAuthAction() {
    const { toHome, toRedirect } = useRouterPush()
    const { initStaticRoute } = useRouteAction()
    const dispatch = useAppDispatch()

    async function resetAuthStore() {
        await clearAuthStorage()
        dispatch(authSlice.actions.resetAuthStore())
        toHome()
    }
    function setIsLoading(isLoading: boolean) {
        dispatch(authSlice.actions.setIsLoading(isLoading))
    }
    function setUserInfo(userInfo: Auth.UserInfo) {
        dispatch(authSlice.actions.setUserInfo(userInfo))
    }
    function setToken(token: string) {
        dispatch(authSlice.actions.setToken(token))
    }

    /** 是否登录 */
    function isLogin() {
        const { token } = getAuthState()
        return Boolean(token)
    }

    /**
     * 处理登录后成功或失败的逻辑
     * @param backendToken - 返回的token
     */
    async function handleActionAfterLogin(
        backendToken: ApiAuth.Token,
        staticRoutes: AuthRoute.Route[]
    ) {
        const loginSuccess = await loginByToken(backendToken)

        if (loginSuccess) {
            await initStaticRoute(staticRoutes)

            // 跳转登录后的地址
            toRedirect()

            const { isInitAuthRoute } = getRouteState()
            const { userInfo } = getAuthState()

            // 登录成功弹出欢迎提示
            if (isInitAuthRoute) {
                notice.success({
                    title: "登录成功!",
                    description: `欢迎回来，${userInfo.userName}!`
                })
            }

            return
        }

        notice.error({ title: "登录失败", description: "请稍后再试~" })
        // 不成功则重置状态
        resetAuthStore()
    }

    /**
     * 根据token进行登录
     * @param backendToken - 返回的token
     */
    async function loginByToken(backendToken: ApiAuth.Token) {
        let successFlag = false

        // 先把token存储到缓存中(后面接口的请求头需要token)
        const { token, refreshToken } = backendToken
        setCookie("accessToken", token, {
            maxAge: parseInt(process.env.TOKEN_LIFETIME!),
            sameSite: true
        })
        // localStg.set("token", `Bearer ${token}`)
        localStg.set("refreshToken", refreshToken)

        // 获取用户信息
        const payload = parseJwtPayload(token)

        if (payload) {
            const { iat, exp, userInfo } = payload
            const now = Math.floor(new Date().getTime() / 1000)

            if (iat <= now && now < exp) {
                // 成功后把用户信息存储到缓存中
                localStg.set("userInfo", userInfo)

                // 更新状态
                setUserInfo(userInfo)
                setToken(`Bearer ${token}`)

                successFlag = true
            }
        }

        return successFlag
    }

    /**
     * 登录
     * @param userName - 用户名
     * @param password - 密码
     */
    async function login(model: Auth.LoginForm, staticRoutes: AuthRoute.Route[]) {
        setIsLoading(true)
        const { data } = await fetchLogin(model)
        if (data) await handleActionAfterLogin(data, staticRoutes)
        setIsLoading(false)
    }

    async function emailLogin(model: Auth.EmailLoginForm, staticRoutes: AuthRoute.Route[]) {
        setIsLoading(true)
        const { data } = await fetchEmailLogin(model)
        if (data) await handleActionAfterLogin(data, staticRoutes)
        setIsLoading(false)
    }

    /**
     * 注册
     * @param userName - 用户名
     * @param password - 密码
     */
    async function register(model: Auth.RegisterForm) {
        setIsLoading(true)
        const { error } = await fetchRegister(model)
        setIsLoading(false)
        return error === null
    }

    return {
        resetAuthStore,
        setIsLoading,
        setUserInfo,
        setToken,
        login,
        emailLogin,
        isLogin,
        register
    }
}
