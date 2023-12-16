import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
    console.log("进入中间件")
    const staticRoutes: AuthRoute.Route[] = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/staticRoutes`,
        {
            headers: { cookie: request.headers.get("cookie")! },
            next: { revalidate: 0 },
            cache: "no-store"
        }
    ).then((res) => res.json())

    console.log("staticRoutes: ", !!staticRoutes)
    if (!staticRoutes) {
        return NextResponse.redirect(new URL("/auth/login", request.url))
    }
    // const { menus } = getRouteState()
    // console.log("menus: ", menus)

    // console.log("request.nextUrl: ", request.nextUrl.pathname)
    // const permissions = to.meta.permissions |[];
    // const needLogin = Boolean(to.meta?.requiresAuth) |Boolean(permissions.length);
    // const hasPermission = !permissions.length |permissions.includes(auth.userInfo.userRole);

    // const { isInitAuthRoute } = getRouteState()
    // const { token } = getAuthState()
    // const { isInitAuthRoute } = useRouteState()
    // const {token} = useAuthState()
    // console.log("token: ", token)
    // console.log("isInitAuthRoute: ", isInitAuthRoute)
    // if (!isInitAuthRoute && !Boolean(token)) {
    //     return NextResponse.redirect(new URL("/auth/login", request.url))
    // }
}

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/student/:path*",
        "/teacher/:path*",
        "/course/:path*",
        "/score/:path*",
        "/exam/:path*",
        "/task/:path*",
        "/resource/:path*",
        "/activity/:path*",
        "/class/:path*",
        "/learning/:path*",
        "/notice/:path*",
        "/setting/:path*",
        "/about/:path*"
        // "/((?!api|index|auth|_next/static|_next/image|favicon.ico|robots.txt).*)"
    ]
}
