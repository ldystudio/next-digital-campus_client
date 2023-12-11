import NextLink, { LinkProps as NextLinkProps } from "next/link"

import { Link as NextUiLink, LinkProps as NextUiLinkProps } from "@nextui-org/react"

type NextLinkPropsMixin = NextLinkProps & NextUiLinkProps

interface LinkProps extends NextLinkPropsMixin {
    children: React.ReactNode
    href: AuthRoute.RoutePath
}

export function Link({ children, href, ...props }: LinkProps) {
    return (
        <NextUiLink href={href} as={NextLink} {...props}>
            {children}
        </NextUiLink>
    )
}
