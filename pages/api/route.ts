import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import _ from "lodash";

import { sortRoutes } from "~/utils/router";

export default function readAllRouteModuleFiles(
	req: NextApiRequest,
	res: NextApiResponse<AuthRoute.Route[]>
) {
	const modules: AuthRoute.Route[] = fs
		.readdirSync("./src/router/modules")
		.map((filename) => require(`../../src/router/modules/${filename.split(".")[0]}`).default);

	res.status(200).json(sortRoutes(_.compact(modules)));
}
