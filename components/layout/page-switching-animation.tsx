"use client";
import { usePathname } from "next/navigation";

import clsx from "clsx";
import { motion, Variants } from "framer-motion";

interface PageSwitchingAnimationProps {
	children: React.ReactNode;
	className?: string;
	variants?: {
		initial: Variants["initial"];
		animate: Variants["animate"];
	};
}

export function PageSwitchingAnimation({
	children,
	className,
	variants
}: PageSwitchingAnimationProps) {
	const pathname = usePathname();

	const slideInVariants: Variants = {
		initial: { translateX: "-50%" },
		animate: { translateX: "0" }
	};

	return (
		<motion.div
			key={pathname}
			variants={variants || slideInVariants}
			initial='initial'
			animate='animate'
			transition={{
				type: "tween",
				duration: 0.5
			}}
			className={clsx("transform-gpu", className)}
		>
			{children}
		</motion.div>
	);
}
