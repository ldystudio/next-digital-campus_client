import type { AxiosRequestConfig } from "axios"
import { setCookie } from "cookies-next"

import { clearAuthStorage } from "~/store/modules/auth/helpers"
import { clearRouteStorage } from "~/store/modules/route/helpers"
import { localStg } from "~/utils/storage"
import { fetchUpdateToken } from "../api"

/**
 * 刷新token
 * @param axiosConfig - token失效时的请求配置
 */
export async function handleRefreshToken(axiosConfig: AxiosRequestConfig) {
    const refreshToken = localStg.get("refreshToken") || ""
    const { data } = await fetchUpdateToken(refreshToken)
    if (data) {
        setCookie("accessToken", data.accessToken, {
            maxAge: parseInt(process.env.TOKEN_LIFETIME!),
            sameSite: true
        })
        localStg.set("refreshToken", data.refreshToken)

        return { ...axiosConfig }
    }

    window.location.href = "/auth/login"
    await clearAuthStorage()
    await clearRouteStorage()
    return null
}
