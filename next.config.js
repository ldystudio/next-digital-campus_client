const isDev = process.env.NODE_ENV === "development"

/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    poweredByHeader: isDev,
    env: {
        BACKEND_URL: isDev
            ? "http://192.168.1.215:8000/api/v1"
            : "http://203.195.168.162:8000/api/v1",
        ROUTE_HOME_PATH: "/",
        TOKEN_LIFETIME: "604800",
        LOCAL_STORAGE_CACHE_TIME: "604800" // 默认缓存期限为7天
    },
    logging: {
        fetches: {
            fullUrl: true
        }
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    typescript: {
        ignoreBuildErrors: true
    }
}
