"use client";
import { useEffect } from "react";

import { Progress as NextUIProgress } from "@nextui-org/react";

import { useProgressStore, setValueHandler } from "~/store/progress";

export function Progress(): JSX.Element {
	const value = useProgressStore((state) => state.value);
	const color = useProgressStore((state) => state.color);

	useEffect(() => {
		const interval = setInterval(() => {
			setValueHandler(value >= 100 ? 100 : value + 1);
		}, 50);

		return () => clearInterval(interval);
	}, [value]);

	return (
		<NextUIProgress
			aria-label='Loading...'
			size='sm'
			value={value}
			isStriped
			color={color as "primary" | "success" | "warning" | "danger"}
			className='absolute w-full z-10'
			classNames={{ track: "bg-transparent" }}
		/>
	);
}
