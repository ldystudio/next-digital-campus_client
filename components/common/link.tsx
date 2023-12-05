import NextLink, { LinkProps as NextLinkProps } from "next/link";

import { Link as NextUiLink, LinkProps as NextUiLinkProps } from "@nextui-org/react";

type NextLinkPropsMixin = NextLinkProps & NextUiLinkProps;

interface LinkProps extends NextLinkPropsMixin {
	children: React.ReactNode;
}

export function Link({ children, ...props }: LinkProps) {
	return (
		<NextUiLink as={NextLink} {...props}>
			{children}
		</NextUiLink>
	);
}
