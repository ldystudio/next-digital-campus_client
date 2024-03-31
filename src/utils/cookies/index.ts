"use server"

import { cookies } from "next/headers"

import { getCookie } from "cookies-next"

import { verifyAndParseJwtPayload } from "~/utils/common"

export async function getAccessTokenFromServer() {
    const token = getCookie("accessToken", { cookies })
    return await verifyAndParseJwtPayload(token)
}
