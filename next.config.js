/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development"
module.exports = {
    reactStrictMode: true,
    poweredByHeader: isDev,
    env: {
        SERVER_URL: isDev
            ? "http://192.168.1.215:8000/api/v1"
            : "https://203.195.168.162/api/v1",
        ROUTE_HOME_PATH: "/",
        TOKEN_LIFETIME: "604800",
        LOCAL_STORAGE_CACHE_TIME: "604800" // 默认缓存期限为7天
    },
    logging: {
        fetches: {
            fullUrl: true
        }
    }
}
