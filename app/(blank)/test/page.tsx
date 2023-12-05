"use client";
import Link from "next/link";

import { motion } from "framer-motion";

// Our custom easing
let easing = [0.6, -0.05, 0.01, 0.99];

// animate: defines animation
// initial: defines initial state of animation or stating point.
// exit: defines animation when component exits

// Custom variant
const fadeInUp = {
	initial: {
		y: 60,
		opacity: 0,
		transition: { duration: 0.6, ease: easing }
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: easing
		}
	}
};

const stagger = {
	animate: {
		transition: {
			staggerChildren: 0.1
		}
	}
};

const products = [
	{
		id: "ghost-whey-x-chips-ahoy",
		name: "Ghost Whey X Chips Ahoy",
		details:
			"We've said it before and we will say it again, nothing beats the real thing. With years of R&D and REAL CHIPS AHOY!® cookie pieces in every scoop, this flavor is second to none.",
		price: "$39.99",
		image: "https://cdn.shopify.com/s/files/1/2060/6331/products/image.png?v=1571331841"
	},
	{
		id: "ghost-whey-vegan",
		name: "GHOST® Vegan Protein",
		details:
			"GHOST Vegan Protein combines a premium, fully disclosed vegan protein blend with industry-leading flavors...what more could you ask for?",
		price: "$49.99",
		image: "https://cdn.shopify.com/s/files/1/2060/6331/products/Vegan.png?v=1574882358"
	}
];

export default function Test() {
	return (
		<>
			<section>
				<Button
					onPress={() =>
						setUserInfo({ userId: "100", userName: "test", userRole: "admin" })
					}
				>
					设置
				</Button>
				<Button onPress={() => resetAuthStore()}>重置</Button>
				<p>{userInfo.userId}</p>
				<p>{userInfo.userName}</p>
				<p>{userInfo.userRole}</p>
			</section>
			<section>
				{/* <Button onPress={() => fetchUpdateToken(refresh)}>测试</Button> */}
				<Motion />
			</section>
		</>
	);
}
