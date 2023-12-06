interface JwtPayload {
	iat: number;
	exp: number;
	userInfo: Auth.UserInfo;
}

export function parseJwtPayload(token: string): JwtPayload | null {
	const jwtParts = token.split(".");
	if (jwtParts.length !== 3) {
		return null;
	}
	try {
		const payloadJson = atob(jwtParts[1]);
		const payloadObj = JSON.parse(payloadJson);
		const { iat, exp, userId, userName, userRole, avatar } = payloadObj;
		if (typeof iat === "number" && typeof exp === "number") {
			return { iat, exp, userInfo: { userId, userName, userRole, avatar } };
		}
		return null;
	} catch (e) {
		return null;
	}
}
