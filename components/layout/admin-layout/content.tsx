// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

// import clsx from "clsx";
// import { Card, CardBody, CardFooter, CardHeader, Divider, Tab, Tabs } from "@nextui-org/react";

// import { Iconify } from "@/components/common";
// import { useMenuItem } from "~/hooks/common";
// import { successProgress, errorProgress } from "~/store/progress";
// import { useTabs } from "~/store/tabs-context";

// interface contentProps {
// 	children: React.ReactNode;
// }

// /**
//  * Renders the content component.
//  *
//  * @param props - The props for the content component.
//  * @returns The rendered content component.
//  */
// export default function Content(props: contentProps) {
// 	const router = useRouter();
// 	const { menuItem } = useMenuItem();
// 	const { tabs } = useTabs();
// 	const [selectedTab, setSelectedTab] = useState(menuItem.meta.title);

// 	// useEffect(() => {
// 	// 	setSelectedTab(menuItem.meta.title);
// 	// }, [menuItem.meta.title]);

// 	useEffect(() => {
// 		// Attach event listener for successful route change
// 		router.events.on("routeChangeComplete", successProgress);
// 		// Attach event listener for failed route change
// 		router.events.on("routeChangeError", errorProgress);

// 		// Detach event listener when component unmounts
// 		return () => {
// 			router.events.off("routeChangeComplete", successProgress);
// 			router.events.off("routeChangeError", errorProgress);
// 		};
// 	}, [router.events]);

// 	return (
// 		<Card className={clsx("flex-grow mr-5 my-5")} shadow='sm'>
// 			<CardHeader>
// 				<Iconify icon={menuItem.meta.icon} color='#006FEE' />
// 				<p className='text-xl'>{menuItem.meta.title}</p>
// 			</CardHeader>
// 			<Divider />
// 			{/* <CardHeader className='p-1'>
// 				<Tabs
// 					aria-label='Dynamic tabs'
// 					variant='light'
// 					color='primary'
// 					size='lg'
// 					selectedKey={selectedTab}
// 					onSelectionChange={(key: React.Key) => {
// 						setSelectedTab(key.toString());
// 						router.push(
// 							selectedMenuHistory.find((item) => item.meta.title === key)!.path
// 						);
// 					}}
// 				>
// 					{tabs.map((item) => (
// 						<Tab
// 							key={item.title}
// 							title={
// 								<div className='flex items-center space-x-2'>
// 									<div className='flex items-center space-x-2'>
// 										<Icon icon={item.icon} />
// 										<span>{item.title}</span>
// 									</div>
// 								</div>
// 							}
// 						></Tab>
// 					))}
// 				</Tabs>
// 			</CardHeader> */}
// 			<CardBody>{props.children}</CardBody>
// 		</Card>
// 	);
// }
