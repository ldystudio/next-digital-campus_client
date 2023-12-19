import { cookies } from "next/headers"

import { getCookie } from "cookies-next"

import { readAllRouteModuleFiles } from "~/router"
import { verifyAndParseJwtPayload } from "~/utils/common"

export async function GET() {
    const token = getCookie("token", { cookies })
    const res = await verifyAndParseJwtPayload(token)

    if (!res) return Response.json(null, { status: 401 })

    const staticRoutes = await readAllRouteModuleFiles()

    return Response.json(staticRoutes, { status: 200 })
}
