"use server"

import fs from "node:fs"
import _compact from "lodash/compact"

import { sortRoutes } from "~/utils/router"

export async function readAllRouteModuleFiles() {
    const modules: AuthRoute.Route[] = fs
        .readdirSync("./src/router/modules")
        .map(
            (filename: string) => require(`./modules/${filename.split(".")[0]}`).default
        )

    return sortRoutes(_compact(modules))
}
