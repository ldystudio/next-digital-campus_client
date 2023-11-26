"use client";
import { useState } from "react";

import toast from "react-hot-toast";
import { useBoolean } from "usehooks-ts";
import { Image, Popover, PopoverContent, PopoverTrigger, Skeleton } from "@nextui-org/react";

export default function ImageCaptcha() {
	const { value: isLoaded, setTrue, setFalse } = useBoolean(false);

	const generateTraceId = () => `${Math.random().toString(36).slice(-8)}${Date.now()}`;
	const [traceId, setTraceId] = useState(generateTraceId());
	const captchaURL = `${process.env.SERVER_URL}/auth/image_captcha/?traceId=` + traceId;

	return (
		<Skeleton isLoaded={isLoaded} className='rounded-lg h-[41px] w-[109px]'>
			<Popover isOpen={!isLoaded} radius='sm' showArrow>
				<PopoverTrigger>
					<Image
						src={captchaURL}
						alt='验证码'
						draggable='false'
						onClick={() => {
							setTraceId(generateTraceId());
							setFalse();
						}}
						onLoad={() => {
							setTrue();
						}}
					/>
				</PopoverTrigger>
				<PopoverContent>
					<span className='text-danger'>Too Many Requests</span>
				</PopoverContent>
			</Popover>
		</Skeleton>
	);
}
