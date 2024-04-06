import { request } from "../request"

const CONTROLLER = "/course"

export function fetchCourseList<T>() {
    return request.get<ApiPage.Query<T>>(`${CONTROLLER}/choose/`)
}
