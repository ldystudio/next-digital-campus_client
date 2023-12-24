import { deleteCookie, getCookie } from "cookies-next"

import { localStg } from "~/utils/storage"

/** 获取token */
export function getToken() {
    return getCookie("accessToken") || ""
    // return localStg.get("token") || ""
}

export const emptyInfo: Auth.UserInfo = {
    userId: "",
    userName: "",
    userRole: "student",
    avatar: undefined
}

/** 获取用户信息 */
export function getUserInfo() {
    return localStg.get("userInfo") || emptyInfo
}

/** 去除用户相关缓存 */
export async function clearAuthStorage() {
    // localStg.remove("token")
    deleteCookie("accessToken")
    localStg.remove("refreshToken")
    localStg.remove("userInfo")
}
