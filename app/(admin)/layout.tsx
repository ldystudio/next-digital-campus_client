// import { Metadata } from "next";

// import clsx from "clsx";

// import { Progress } from "@/components/common";
// import { Content, Side } from "@/components/layout";
// import { useMenuItem } from "~/hooks/common";
// import { useProgressStore } from "~/store/progress";

// export default function AdminLayout({ children }: LayoutProps) {
// 	const { menuItem } = useMenuItem();
// 	const isShow = useProgressStore((state) => state.isShow);

// 	return (
// 		<>
// 			{isShow && <Progress />}
// 			<div
// 				className={clsx(
// 					"flex h-screen bg-[#f3f3f3] dark:bg-background"
// 					// NotoSansSC.className
// 				)}
// 			>
// 				<Side />
// 				<Content>{children}</Content>
// 			</div>
// 		</>
// 	);
// }
