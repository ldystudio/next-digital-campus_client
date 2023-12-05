import { createRequest } from "./request";

export const request = createRequest({
	baseURL: process.env.SERVER_URL
});
