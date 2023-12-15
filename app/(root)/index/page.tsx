import { Card, CardBody, CardHeader, button as buttonStyles } from "@nextui-org/react"

import { GithubIcon, Iconify, Row, Image, Link } from "@/components/common"
import { subtitle, title } from "@/components/custom"
import { NotoSansSC, siteConfig } from "~/config"

const introduce = [
    {
        icon: "solar:layers-bold-duotone",
        title: "模块化设计",
        desc: "采用模块化设计，根据不同功能需求实现自定义开发和集成，保证了系统的高可扩展性和灵活性。"
    },
    {
        icon: "solar:shield-keyhole-minimalistic-bold-duotone",
        title: "安全可靠",
        desc: "采用多重安全认证、加密存储等措施，确保数据安全和系统稳定。"
    },
    {
        icon: "solar:smartphone-2-bold-duotone",
        title: "互动便捷",
        desc: "支持移动设备访问，能够随时随地进行信息交流和共享，提升用户使用体验。"
    },
    {
        icon: "solar:graph-new-bold-duotone",
        title: "数据分析",
        desc: "集成了多种数据分析和挖掘工具，通过数据分析和挖掘，提供更全面的学校管理信息支持。"
    },
    {
        icon: "solar:square-academic-cap-2-bold-duotone",
        title: "教育教学",
        desc: "采用针对性设计，兼顾教育教学特色，提供更符合教师和学生需求的管理和学习功能。"
    },
    {
        icon: "solar:chat-round-line-bold-duotone",
        title: "在线沟通",
        desc: "提供在线聊天和讨论功能，通过系统内部的消息系统进行交流和协作，方便快捷地解决问题和分享信息。"
    }
]

export default function HomePage() {
    return (
        <>
            <section className='flex flex-col items-center justify-between gap-4 w-full py-8 lg:py-10 lg:flex-row'>
                <div>
                    <p className={title({ color: "blue" })}>Next数字校园</p>
                    <p className={title({ size: "xs", color: "foreground" })}>
                        现代化信息技术的全新型校园管理系统
                    </p>
                    <p className={subtitle()}>基于React + Redux + Next.js + NextUI</p>
                    <Row space={3} className='mt-3 md:mt-10'>
                        <Link
                            href='/dashboard/analysis'
                            className={buttonStyles({
                                color: "primary",
                                radius: "full",
                                variant: "shadow"
                            })}
                        >
                            进入
                        </Link>
                        <Link
                            isExternal
                            className={buttonStyles({
                                variant: "bordered",
                                radius: "full"
                            })}
                            // @ts-expect-error: link not in AuthRoute.RoutePath
                            href={siteConfig.links.github}
                        >
                            <GithubIcon size={20} />
                            GitHub
                        </Link>
                    </Row>
                </div>
                <Image
                    src='/images/Meeting.svg'
                    alt='meeting'
                    width={500}
                    originalSize={{ width: 1026, height: 691 }}
                    priority
                ></Image>
            </section>
            <section className={`grid grid-cols-2 gap-4 lg:grid-cols-3 ${NotoSansSC.className}`}>
                {introduce.map((item, index) => (
                    <Card
                        isBlurred
                        isPressable
                        shadow='none'
                        key={`introduce - ${index}`}
                        className='bg-default-100'
                    >
                        <CardHeader className='space-x-2'>
                            <Iconify icon={item.icon} height={30} color='#006FEE' />
                            <p className='font-bold'>{item.title}</p>
                        </CardHeader>
                        <CardBody className='pt-0'>
                            <p>{item.desc}</p>
                        </CardBody>
                    </Card>
                ))}
            </section>
        </>
    )
}
