import type { AxiosRequestConfig } from "axios"

// import { useAuthStore } from "~/store";
import { setCookie } from "cookies-next"

import { localStg } from "~/utils/storage"
import { fetchUpdateToken } from "../api"

/**
 * 刷新token
 * @param axiosConfig - token失效时的请求配置
 */
export async function handleRefreshToken(axiosConfig: AxiosRequestConfig) {
    // const { resetAuthStore } = useAuthStore();
    const refreshToken = localStg.get("refreshToken") || ""
    const { data } = await fetchUpdateToken(refreshToken)
    if (data) {
        setCookie("token", `Bearer ${data.token}`, {
            maxAge: parseInt(process.env.TOKEN_LIFETIME!),
            sameSite: true,
            httpOnly: true
        })
        // localStg.set("token", `Bearer ${data.token}`)
        localStg.set("refreshToken", data.refreshToken)

        const config = { ...axiosConfig }
        if (config.headers) {
            config.headers.Authorization = data.token
        }
        return config
    }

    // resetAuthStore();
    return null
}
