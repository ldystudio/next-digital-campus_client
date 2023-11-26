"use client";
import { useEffectOnce, useBoolean } from "usehooks-ts";
import { Icon, IconProps } from "@iconify/react";
import { Skeleton } from "@nextui-org/react";

export function Iconify({ height, ...otherProps }: IconProps) {
	const size = height ? `${height}px` : "auto";
	const { value: isLoaded, setTrue } = useBoolean(false);

	useEffectOnce(() => {
		setTrue();
	});

	return (
		<Skeleton
			className={`rounded-full`}
			style={{ height: size, width: size }}
			isLoaded={isLoaded}
		>
			<Icon height={height || "auto"} {...otherProps} />
		</Skeleton>
	);
}
