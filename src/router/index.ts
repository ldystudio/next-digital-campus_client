"use server"
import fs from "fs"
import _ from "lodash"

import { sortRoutes } from "~/utils/router"

let cachedResult: AuthRoute.Route[] | null = null

export async function readAllRouteModuleFiles() {
    if (cachedResult) {
        return cachedResult
    }

    const modules: AuthRoute.Route[] = fs
        .readdirSync("./src/router/modules")
        .map((filename: string) => require(`./modules/${filename.split(".")[0]}`).default)

    cachedResult = sortRoutes(_.compact(modules))

    return cachedResult
}
