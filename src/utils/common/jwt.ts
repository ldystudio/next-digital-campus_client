"use server"
import fs from "fs"
import jwt from "jsonwebtoken"

interface JwtPayload {
    iat: number
    exp: number
    userInfo: Auth.UserInfo
}

export async function parseJwtPayload(token: string) {
    const jwtParts = token.split(".")
    if (jwtParts.length !== 3) {
        return null
    }

    const publicKeyPath = "public.pem"
    if (!fs.existsSync(publicKeyPath)) {
        console.error("Error reading public key: File not found")
        return null
    }

    const cert = fs.readFileSync(publicKeyPath)

    return jwt.verify(
        token,
        cert,
        { algorithms: ["RS256"] },
        function (err, payload: any): JwtPayload | null {
            if (err) {
                return null
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { iat, exp, jti, token_type, ...userInfo } = payload
            if (typeof iat === "number" && typeof exp === "number") {
                return { iat, exp, userInfo }
            }

            return null
        }
    )
}
