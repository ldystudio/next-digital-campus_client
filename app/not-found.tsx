"use client";
import { useRouter } from "next/navigation";

import { Button, Code } from "@nextui-org/react";

import { Col, Row, Image } from "@/components/common";

export default function NotFound() {
	const router = useRouter();

	return (
		<Col fullWidth justify='center' className='h-screen px-5 gap-4 select-none'>
			<Image
				src='/images/404.svg'
				alt='未找到页面'
				width={[400, 300]}
				originalSize={{ width: 584, height: 490 }}
				darkModeBrightBackground
				priority
			/>
			<Code color='primary' size='lg'>
				404 Page Not Found
			</Code>
			<Row>
				<Button
					variant='bordered'
					radius='full'
					color='primary'
					onClick={() => {
						router.back();
					}}
				>
					返回
				</Button>
				<Button
					variant='solid'
					radius='full'
					color='secondary'
					onClick={() => router.push("/")}
				>
					首页
				</Button>
			</Row>
		</Col>
	);
}
