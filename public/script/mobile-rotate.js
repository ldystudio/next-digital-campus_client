// 移动端旋转, 让网页横屏, 但布局和动画难以维护, 暂时不用

(() => {
	// 获取当前地址
	// const pathname = window.location.pathname;
	// if (pathname === "/") {
	// 	return;
	// }
	const resize = () => {
		const body = document.body;
		const html = document.documentElement;
		const width = Math.max(html.clientWidth, html.clientHeight);
		const height = Math.min(html.clientWidth, html.clientHeight);
		body.style.width = `${width}px`;
		body.style.height = `${height}px`;
	};
	resize();
	window.addEventListener("resize", resize);
})();
