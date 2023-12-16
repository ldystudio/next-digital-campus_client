"use server"
import { CookieValueTypes } from "cookies-next"
import jwt, { JwtPayload } from "jsonwebtoken"
import fs from "node:fs"

interface PayloadTypes extends JwtPayload {
    token_type: string
    userInfo: Auth.UserInfo
}

export async function parseJwtPayload(token: CookieValueTypes) {
    if (!token) return null

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

    return jwt.verify(token, cert, { algorithms: ["RS256"] }, function (err, payload) {
        if (err) {
            return null
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { iat, exp, jti, token_type, ...userInfo } = payload as PayloadTypes
        if (typeof iat === "number" && typeof exp === "number") {
            return { iat, exp, userInfo }
        }

        return null
    })
}
