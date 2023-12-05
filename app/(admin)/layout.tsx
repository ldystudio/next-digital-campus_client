"use client";
import clsx from "clsx";

import { Progress } from "@/components/common";
import { Content, Side } from "@/components/layout";
import { NotoSansSC } from "~/config";
import { useProgressState } from "~/store/modules/progress";

export default function AdminLayout({ children }: LayoutProps) {
	const { isShow } = useProgressState();

	return (
		<>
			{isShow && <Progress />}
			<div
				className={clsx(
					"flex h-screen bg-[#f3f3f3] dark:bg-background",
					NotoSansSC.className
				)}
			>
				<Side />
				<Content>{children}</Content>
			</div>
		</>
	);
}
