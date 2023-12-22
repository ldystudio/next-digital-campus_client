"use server"

import fs from "node:fs"
import _ from "lodash"

import { sortRoutes } from "~/utils/router"

export async function readAllRouteModuleFiles() {
    const modules: AuthRoute.Route[] = fs
        .readdirSync("./src/router/modules")
        .map((filename: string) => require(`./modules/${filename.split(".")[0]}`).default)

    return sortRoutes(_.compact(modules))
}
