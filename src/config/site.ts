export const siteConfig = {
    name: "Next数字校园",
    description: "现代化信息技术的全新型校园管理系统",
    navItems: [
        {
            label: "首页",
            href: "/index"
        },
        {
            label: "关于",
            href: "/about"
        }
    ],
    links: {
        github: "https://github.com/ldystudio/next-digital-campus_client",
        docs: "https://nextui-docs-v2.vercel.app",
        sponsor: "https://patreon.com/jrgarciadev"
    }
}

export type SiteConfig = typeof siteConfig
