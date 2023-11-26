"use client";
import { useRouter } from "next/navigation";

import { Button, Code } from "@nextui-org/react";

import { Col, Row, Image } from "@/components/common";

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
	const router = useRouter();

	return (
		<Col fullWidth justify='center' className='h-screen gap-4 select-none'>
			<Image
				src='/images/403.svg'
				alt='错误页面'
				width={[400, 300]}
				originalSize={{ width: 456, height: 535 }}
				darkModeBrightBackground
				priority
			/>

			<Code color='danger' size='lg' className='mx-5'>
				Error: {error.message}
			</Code>
			<Row>
				<Button variant='bordered' radius='full' color='primary' onPress={() => reset()}>
					重试
				</Button>
				<Button
					variant='solid'
					radius='full'
					color='secondary'
					onPress={() => router.back()}
				>
					返回
				</Button>
			</Row>
		</Col>
	);
}
