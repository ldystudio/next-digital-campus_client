"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import clsx from "clsx";
import { Card, CardBody, CardFooter, CardHeader, Divider, Tab, Tabs } from "@nextui-org/react";

import { Iconify } from "@/components/common";
import { useMenuItemState } from "~/store/modules/menu";
import { useProgressAction } from "~/store/modules/progress";

interface contentProps {
	children: React.ReactNode;
}

export default function Content({ children }: contentProps) {
	const pathname = usePathname();
	const { menuItem } = useMenuItemState();
	const { successProgress } = useProgressAction();

	useEffect(() => {
		successProgress();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	return (
		<Card className={clsx("flex-grow mr-5 my-5")} shadow='sm'>
			<CardHeader>
				<Iconify icon={menuItem.meta.icon} color='#006FEE' />
				<p className='text-xl'>{menuItem.meta.title}</p>
			</CardHeader>
			<Divider />
			<CardBody>{children}</CardBody>
		</Card>
	);
}
