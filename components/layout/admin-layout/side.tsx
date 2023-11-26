// "use client";
// import { useEffect, useMemo } from "react";
// import { useRouter } from "next/router";

// import * as adventurer from "@dicebear/adventurer";
// import { createAvatar } from "@dicebear/core";
// import { AvatarIcon, Button, Card, User } from "@nextui-org/react";

// import { Iconify, Link } from "@/components/common";
// import { Logo, AdminMenu, ThemeSwitch } from "@/components/common";
// import { showProgress } from "~/store/progress";

// /**
//  * Renders the Side component.
//  *
//  * @returns {JSX.Element} The JSX element representing the Side component.
//  */
// export default function Side(): JSX.Element {
// 	const router = useRouter();
// 	// const { appendTab } = useTabs();

// 	// function showProgressAndAppendTabs() {
// 	// 	showProgress();
// 	// }

// 	useEffect(() => {
// 		// Attach event listener for route change start
// 		router.events.on("routeChangeStart", showProgress);

// 		// Detach event listener when component is unmounted
// 		return () => {
// 			router.events.off("routeChangeStart", showProgress);
// 		};
// 	}, [router.events]);

// 	const avatar = useMemo(() => {
// 		return createAvatar(adventurer, { seed: "" }).toDataUriSync();
// 	}, []);

// 	return (
// 		<Card
// 			className='flex-grow-0 min-w-[12rem] mx-5 my-5 items-center justify-between text-center'
// 			shadow='sm'
// 		>
// 			<div className='mt-unit-lg'>
// 				<Link href='/' color='foreground'>
// 					<Logo size={60} />
// 				</Link>
// 			</div>
// 			<div className='h-2/3 w-full'>
// 				<AdminMenu />
// 			</div>
// 			<div className='flex flex-col mb-unit-lg'>
// 				<User
// 					name='Liu ChangQing'
// 					description='Admin'
// 					avatarProps={{
// 						icon: <AvatarIcon />,
// 						src: avatar,
// 						size: "lg"
// 					}}
// 					// isFocusable
// 					classNames={{
// 						base: "flex-col",
// 						wrapper: "items-center gap-2",
// 						name: "text-small",
// 						description: "text-tiny text-foreground-400"
// 					}}
// 				/>
// 				<div className='flex justify-between mt-unit-xs'>
// 					<Button isIconOnly size='sm' variant='light'>
// 						<ThemeSwitch />
// 					</Button>
// 					<Button isIconOnly size='sm' variant='light'>
// 						<Iconify icon='solar:chat-line-bold-duotone' />
// 					</Button>
// 					<Button isIconOnly size='sm' variant='light'>
// 						<Iconify icon='solar:logout-3-bold-duotone' rotate={90} />
// 					</Button>
// 				</div>
// 			</div>
// 		</Card>
// 	);
// }
