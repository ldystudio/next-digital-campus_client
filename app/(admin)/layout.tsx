import clsx from "clsx";

import { Content, Side } from "@/components/layout";
import { NotoSansSC } from "~/config";

export default function AdminLayout({ children }: LayoutProps) {
	return (
		<main>
			<div
				className={clsx(
					"flex h-screen bg-[#f3f3f3] dark:bg-background",
					NotoSansSC.className
				)}
			>
				<Side />
				<Content>{children}</Content>
			</div>
		</main>
	);
}
