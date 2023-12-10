import { useMemo } from "react";

import * as adventurer from "@dicebear/adventurer";
import { createAvatar } from "@dicebear/core";
import { AvatarIcon, Button, Card, User } from "@nextui-org/react";

import { Col, Iconify, Link, Row } from "@/components/common";
import { Logo, AdminMenu, ThemeSwitch } from "@/components/common";

/**
 * Renders the Side component.
 *
 * @returns {JSX.Element} The JSX element representing the Side component.
 */
export default function Side(): JSX.Element {
	const avatar = useMemo(() => {
		return createAvatar(adventurer, { seed: "asdasdghdf" }).toDataUriSync();
	}, []);

	return (
		<Card className='flex min-w-[12rem] mx-5 my-5 items-center justify-around' shadow='sm'>
			<Link href='/' color='foreground' className='pt-1'>
				<Logo size={60} />
			</Link>
			<div className='h-2/3 w-full'>
				<AdminMenu />
			</div>
			<Col>
				<User
					name='Liu ChangQing'
					description='Admin'
					avatarProps={{
						icon: <AvatarIcon />,
						src: avatar,
						size: "lg"
					}}
					// isFocusable
					classNames={{
						base: "flex-col",
						wrapper: "items-center gap-2",
						name: "text-small",
						description: "text-tiny text-foreground-400"
					}}
				/>
				<Row>
					<ThemeSwitch />
					<Button isIconOnly size='sm' variant='light'>
						<Iconify icon='solar:chat-line-bold-duotone' />
					</Button>
					<Button isIconOnly size='sm' variant='light'>
						<Iconify icon='solar:logout-3-bold-duotone' rotate={90} />
					</Button>
				</Row>
			</Col>
		</Card>
	);
}
