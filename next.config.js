/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: process.env.NODE_ENV !== "production",
    // basePath: '',
    env: {
        // SERVER_URL: "http://192.168.1.215:8000/api/v1",
        // SERVER_URL: "http://10.20.98.24:8000/api/v1",
        SERVER_URL: "http://127.0.0.1:8000/api/v1",
        ROUTE_HOME_PATH: "/",
        TOKEN_LIFETIME: "43200",
        LOCAL_STORAGE_CACHE_TIME: "604800" // 默认缓存期限为7天
    },
    logging: {
        fetches: {
            fullUrl: true
        }
    }
}

module.exports = nextConfig
