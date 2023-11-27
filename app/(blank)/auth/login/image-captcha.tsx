"use client";
import { useEffect, useRef, useState } from "react";

import { Image, Popover, PopoverContent, PopoverTrigger, Skeleton } from "@nextui-org/react";

export default function ImageCaptcha() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [showPopover, setShowPopover] = useState(false);
	const [firstLoad, setFirstLoad] = useState(true);

	const generateTraceId = () => `${Math.random().toString(36).slice(-8)}${Date.now()}`;
	const [traceId, setTraceId] = useState(generateTraceId());
	const captchaURL = `${process.env.SERVER_URL}/auth/image_captcha/?traceId=${traceId}`;

	const timerIdRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!isLoaded && !firstLoad) {
			timerIdRef.current = setTimeout(() => {
				setShowPopover(true);
			}, 1000);
		} else {
			if (timerIdRef.current) {
				clearTimeout(timerIdRef.current);
			}
			setShowPopover(false);
		}
	}, [firstLoad, isLoaded]);

	const handleImageLoad = () => {
		setIsLoaded(true);
		setFirstLoad(false);
	};

	const handleImageClick = () => {
		setTraceId(generateTraceId());
		setIsLoaded(false);
	};

	return (
		<Skeleton isLoaded={isLoaded} className='rounded-lg h-[41px] w-[109px]'>
			<Popover isOpen={showPopover} radius='sm' showArrow>
				<PopoverTrigger>
					<Image
						src={captchaURL}
						alt='验证码'
						draggable='false'
						onClick={handleImageClick}
						onLoad={handleImageLoad}
					/>
				</PopoverTrigger>
				<PopoverContent>
					<span className='text-danger'>验证码更新频率过快，请您稍后再试。</span>
				</PopoverContent>
			</Popover>
		</Skeleton>
	);
}
