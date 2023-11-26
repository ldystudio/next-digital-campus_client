import { memo } from "react";

import clsx from "clsx";
import memoizeOne from "memoize-one";

interface DimensionProps {
	children: React.ReactNode;
	reverse?: boolean;
	fullWidth?: boolean;
	fullHeight?: boolean;
	items?: "start" | "end" | "center" | "baseline" | "stretch";
	justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
	space?: number;
	className?: string;
}

const generateStyles = memoizeOne(
	(direction, fullWidth, fullHeight, items, justify, space, className) => {
		const i = items && ["start", "end"].includes(items) ? `flex-${items}` : items;
		const j =
			justify &&
			(["start", "end"].includes(justify)
				? `flex-${justify}`
				: ["between", "around", "evenly"].includes(justify)
				? `space-${justify}`
				: justify);

		const styles = {
			display: "flex",
			flexDirection: direction,
			alignItems: i || "center",
			justifyContent: j || "flex-start"
		};

		const classNames = clsx(
			fullWidth && "w-full",
			fullHeight && "h-full",
			`gap-${space || 2}`,
			className
		);

		return { styles, classNames };
	}
);

export const Row = memo(
	({
		children,
		reverse,
		fullWidth,
		fullHeight,
		items,
		justify,
		space,
		className
	}: DimensionProps) => {
		const direction = reverse ? "row-reverse" : "row";
		const { styles, classNames } = generateStyles(
			direction,
			fullWidth,
			fullHeight,
			items,
			justify,
			space,
			className
		);

		return (
			<div style={styles} className={classNames}>
				{children}
			</div>
		);
	}
);
Row.displayName = "Row";

export const Col = memo(
	({
		children,
		reverse,
		fullWidth,
		fullHeight,
		items,
		justify,
		space,
		className
	}: DimensionProps) => {
		const direction = reverse ? "column-reverse" : "column";
		const { styles, classNames } = generateStyles(
			direction,
			fullWidth,
			fullHeight,
			items,
			justify,
			space,
			className
		);

		return (
			<div style={styles} className={classNames}>
				{children}
			</div>
		);
	}
);
Col.displayName = "Col";
