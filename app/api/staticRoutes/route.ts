import { cookies } from "next/headers"

import { getCookie } from "cookies-next"
import _ from "lodash"
import fs from "node:fs"

import { parseJwtPayload } from "~/utils/common"
import { sortRoutes } from "~/utils/router"

export async function GET() {
    const token = getCookie("token", { cookies })
    const res = await parseJwtPayload(token)

    if (!res) {
        return Response.json(null, { status: 401 })
    }

    const modules: AuthRoute.Route[] = fs
        .readdirSync("./src/router/modules")
        .map(
            (filename: string) =>
                require(`../../../src/router/modules/${filename.split(".")[0]}`).default
        )

    return Response.json(sortRoutes(_.compact(modules)), { status: 200 })
}
