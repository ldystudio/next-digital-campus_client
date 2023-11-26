"use client";
import NextImage, { ImageProps as NextImageProps } from "next/image";

import clsx from "clsx";
import { useMediaQuery } from "usehooks-ts";
import { Image as NextUiImage, ImageProps as NextUiImageProps } from "@nextui-org/react";

import { isNumber } from "~/utils/common";

type NextImagePropsMixin = Omit<NextImageProps, "src" | "width"> & Omit<NextUiImageProps, "width">;

interface ImageProps extends NextImagePropsMixin {
	width: number | [number, number]; // 在电脑上的宽度、在手机上的宽度
	originalSize: {
		width: number;
		height: number;
	};
	darkModeBrightBackground?: boolean;
}

export function Image({
	width,
	originalSize,
	darkModeBrightBackground,
	className,
	...otherProps
}: ImageProps) {
	const isMdDevice = useMediaQuery("(min-width: 768px)");
	width = isNumber(width) ? [width, width] : width;
	const imgWidth = isMdDevice ? width[0] : width[1];
	const imgHeight = Math.round((imgWidth * originalSize.height) / originalSize.width);

	return (
		<NextUiImage
			as={NextImage}
			width={imgWidth}
			height={imgHeight}
			draggable='false'
			isBlurred
			className={clsx(
				darkModeBrightBackground && "dark:bg-foreground",
				"select-none",
				className
			)}
			{...otherProps}
		/>
	);
}
