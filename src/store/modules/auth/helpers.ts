import { localStg } from "~/utils/storage";

/** 获取token */
export function getToken() {
	return localStg.get("token") || "";
}

export const emptyInfo: Auth.UserInfo = {
	userId: "",
	userName: "",
	userRole: "student",
	avatar: undefined,
	realName: undefined,
	email: undefined
};

/** 获取用户信息 */
export function getUserInfo() {
	return localStg.get("userInfo") || emptyInfo;
}

/** 去除用户相关缓存 */
export async function clearAuthStorage() {
	localStg.remove("token");
	localStg.remove("refreshToken");
	localStg.remove("userInfo");
}
