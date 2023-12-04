"use client";
import { Button } from "@nextui-org/react";

import { routes } from "~/router/modules";
import { useCounterState, useCounterAction } from "~/store";

export default function Test() {
	const { count } = useCounterState();
	const { increment, decrement, incrementByAmount } = useCounterAction();
	return (
		<>
			<div>
				<Button onPress={() => increment()}>{count}</Button>
				<Button onPress={() => decrement()}>{count}</Button>
				<Button onPress={() => incrementByAmount(5)}>{count}</Button>
			</div>
			<div className='mt-5'>
				<Button onPress={() => increment()}>{count}</Button>
				<Button onPress={() => decrement()}>{count}</Button>
				<Button onPress={() => incrementByAmount(10)}>{count}</Button>
			</div>
		</>
	);
}
