/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// basePath: '',
	env: {
		APP_NAME: "Next Digital Campus",
		APP_TITLE: "Next数字校园",
		APP_DESC: "现代化信息技术的全新型校园管理系统",
		// SERVER_URL: "http://192.168.1.215:8000/api",
		SERVER_URL: "http://127.0.0.1:8000/api",
		ROUTE_HOME_PATH: "/"
	}
};

module.exports = nextConfig;
