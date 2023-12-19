interface JwtPayload {
    iat: number
    exp: number
    userInfo: Auth.UserInfo
}

export function parseJwtPayload(token: string | null): JwtPayload | null {
    if (!token) return null
    const jwtParts = token.split(".")
    if (jwtParts.length !== 3) {
        return null
    }
    try {
        const payloadJson = atob(jwtParts[1])
        const payloadObj = JSON.parse(payloadJson)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { iat, exp, jti, token_type, ...userInfo } = payloadObj
        if (typeof iat === "number" && typeof exp === "number") {
            return { iat, exp, userInfo }
        }
        return null
    } catch (e) {
        return null
    }
}
