import { createRequest } from "./request"

export const request = createRequest({
    baseURL: process.env.BACKEND_URL
})
