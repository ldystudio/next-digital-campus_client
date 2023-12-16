import { getRouteState } from "~/store"
import { localStg } from "~/utils/storage"

export async function GET() {
    const menus = localStg.get("menus")
    return Response.json(menus)
}
