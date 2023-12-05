"use client";
import { Button } from "@nextui-org/react";

import { title } from "@/components/custom";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export default function PricingPage() {
	const { toast } = useToast();

	return (
		<Button
			variant='bordered'
			onClick={() => {
				toast({
					title: "Uh oh! Something went wrong.",
					description: "There was a problem with your request.",
					action: <ToastAction altText='Try again'>Try again</ToastAction>
				});
			}}
		>
			Show Toast
		</Button>
	);
}
