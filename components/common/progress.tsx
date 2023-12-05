"use client";
import { useEffect } from "react";

import { Progress as NextUIProgress } from "@nextui-org/react";

import { useProgressState, useProgressAction } from "~/store/modules/progress";

export function Progress(): JSX.Element {
	const { color, value } = useProgressState();
	const { setValue } = useProgressAction();

	useEffect(() => {
		const interval = setInterval(() => {
			value < 100 && setValue(value + 1);
		}, 50);

		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
