import { request } from "../request"

const CONTROLLER = "/course"

export function getCourseList<T>() {
    return request.get<ApiPage.Query<T>>(`${CONTROLLER}/choose/`)
}

export function updateCourseChoose<T>(id: string) {
    return request.patch<T>(`${CONTROLLER}/choose/${id}/`)
}
