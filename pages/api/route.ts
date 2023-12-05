import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import _ from "lodash";

export default function readAllRouteModuleFiles(
	req: NextApiRequest,
	res: NextApiResponse<AuthRoute.Route[]>
) {
	const modules: AuthRoute.Route[] = fs.readdirSync("./src/router/modules").map((filename) => {
		if (!filename.includes("index")) {
			return require(`../../src/router/modules/${filename.split(".")[0]}`).default;
		}
	});

	res.status(200).json(_.compact(modules));
}
