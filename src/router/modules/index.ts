import _ from "lodash";

import { sortRoutes } from "~/utils/router";

// async function getRoutes() {
// 	"use server";
// return fg.globSync("src/router/modules/*.ts", { onlyFiles: true }).map((filepath) => {
//     if (!filepath.includes("index") && !filepath.includes("get-route")) {
//         return require(`${filepath.split(".ts")[0]}`).default;
//     }
// });
// }

// const modules: AuthRoute.Route[] = await getRoutes();
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/route`, { cache: "no-store" });
const modules = await res.json();
export const routes = sortRoutes(_.compact(modules));
