import { cookies } from "next/headers"

import { hasCookie } from "cookies-next"
import fs from "fs"
import _ from "lodash"

import { sortRoutes } from "~/utils/router"

export async function GET() {
    const isLogin = hasCookie("token", { cookies })
    if (!isLogin) {
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
