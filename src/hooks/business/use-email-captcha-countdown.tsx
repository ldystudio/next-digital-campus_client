import { useCountdown } from "usehooks-ts";

export function useEmailCaptchaCountdown(seconds: number = 60) {
	const [count, { startCountdown, resetCountdown }] = useCountdown({
		countStart: seconds,
		intervalMs: 1000
	});

	const CountdownText = () =>
		count === 0 || count === seconds ? (
			<span>获取验证码</span>
		) : (
			<span>{count} 秒后重新获取</span>
		);

	return {
		count,
		startCountdown,
		resetCountdown,
		CountdownText
	};
}
