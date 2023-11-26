// import { useRouter } from "next/navigation";

// import { Accordion, AccordionItem, ScrollShadow } from "@nextui-org/react";

// import { Iconify } from "@/components/common";
// import { siteConfig } from "~/config";
// import { useMenuItem } from "~/hooks/common";
// import { useTabs } from "~/store/tabs-context";

// export function AdminMenu() {
// 	// 手风琴样式
// 	const itemClasses = {
// 		base: "py-0 w-full",
// 		title: "font-normal text-medium hover:text-primary",
// 		trigger: "px-2 py-0 hover:bg-default-100 rounded-lg h-10 flex items-center",
// 		indicator: "text-medium"
// 	};
// 	const { menuItem, setMenuItem } = useMenuItem();
// 	const { appendTab } = useTabs();
// 	const router = useRouter();

// 	return (
// 		<ScrollShadow className='h-full w-full' size={20} hideScrollBar>
// 			<Accordion
// 				showDivider={false} // 不显示分割符
// 				itemClasses={itemClasses}
// 				defaultExpandedKeys={["10"]} // 默认打开第一个
// 				// selectionMode='multiple'
// 			>
// 				{siteConfig.sideMenuItems.map((item, index) => (
// 					<AccordionItem
// 						key={`sideMenuItems - ${index}`}
// 						aria-label={item.name}
// 						title={item.meta.title}
// 						startContent={
// 							<Iconify
// 								icon={item.meta.icon}
// 								color={
// 									item.meta.title === menuItem.meta.title ? "#006FEE" : "#11181C"
// 								}
// 							/>
// 						}
// 						hideIndicator={!item.children}
// 						classNames={{
// 							content: item.children ? "" : "hidden"
// 						}}
// 						onPress={() => {
// 							if (!item.children) {
// 								setMenuItem(item);
// 								router.push(item.path);
// 							}
// 						}}
// 					>
// 						{item.children && (
// 							<Accordion showDivider={false} itemClasses={itemClasses}>
// 								{item.children.map((subItem) => (
// 									<AccordionItem
// 										key={subItem.meta.order}
// 										aria-label={subItem.name}
// 										title={subItem.meta.title}
// 										startContent={
// 											<Iconify
// 												icon={subItem.meta.icon}
// 												color={
// 													subItem.meta.title === menuItem.meta.title
// 														? "#006FEE"
// 														: "#11181C"
// 												}
// 											/>
// 										}
// 										hideIndicator
// 										classNames={{ content: "hidden" }}
// 										onPress={() => {
// 											setMenuItem(subItem);
// 											router.push(subItem.path);
// 										}}
// 									/>
// 								))}
// 							</Accordion>
// 						)}
// 					</AccordionItem>
// 				))}
// 			</Accordion>
// 		</ScrollShadow>
// 	);
// }
