"use client";
import { useEffect, useState } from "react";

import { shallow } from "zustand/shallow";
import { Button } from "@nextui-org/react";

import { useCatsStore, incrementBigCats, incrementSmallCats, reset } from "~/store/catStore";
import { useAsyncStore } from "~/utils/store";

export function Cats1() {
	const bigCats = useCatsStore((state) => state.cats.bigCats);
	const smallCats = useCatsStore((state) => state.cats.smallCats);

	return (
		<div>
			<h1>Cats1</h1>
			<div>
				<h1 suppressHydrationWarning>{Math.random()}</h1>
				<p>bigCats: {bigCats}</p>
				<p>smallCats: {smallCats}</p>
				<Button onClick={incrementBigCats}>add big cats</Button>
			</div>
		</div>
	);
}

export function Cats2() {
	const bigCats = useAsyncStore(useCatsStore, (state) => state.cats.bigCats);
	const [bgColor, setBgColor] = useState<"bg-green-500" | "bg-red-500" | undefined>(undefined);

	useEffect(() => {
		const unSub = useCatsStore.subscribe(
			(state) => state.cats.smallCats,
			(smallCats, prevSmallCats) => {
				if (prevSmallCats <= 5 && smallCats > 5) {
					setBgColor("bg-green-500");
				} else if (prevSmallCats > 5 && smallCats <= 5) {
					setBgColor("bg-red-500");
				}
			},
			{
				equalityFn: shallow,
				fireImmediately: false
			}
		);
		return unSub;
	}, []);

	return (
		<div className={bgColor}>
			<h1>Cats2</h1>
			<div>
				<h1 suppressHydrationWarning>{Math.random()}</h1>
				<p>bigCats: {bigCats}</p>
			</div>
		</div>
	);
}

export function Cats3() {
	const add5SmallCats = () => {
		useCatsStore.setState((state) => ({
			cats: { ...state.cats, smallCats: state.cats.smallCats + 5 }
		}));
	};

	return (
		<div className='border'>
			<h1>Cats3</h1>
			<h1 suppressHydrationWarning>{Math.random()}</h1>
			<div className='space-x-5'>
				<Button onClick={incrementBigCats}>add big cats</Button>
				<Button onClick={incrementSmallCats}>add small cats</Button>
				<Button onClick={add5SmallCats}>add 5 small cats</Button>
				<Button onClick={reset}>rest cats</Button>
			</div>
		</div>
	);
}
