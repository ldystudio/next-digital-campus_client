import { button as buttonStyles } from "@nextui-org/react"

import { Row } from "@/components/common/dimension"
import {
    FramerMotionIcon,
    GithubIcon,
    NextjsIcon,
    NextUiIcon,
    ReactIcon,
    TailwindIcon
} from "@/components/common/icons"
import { LocalImage } from "@/components/common/image"
import { Link } from "@/components/common/link"
import { title } from "@/components/custom"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
import { JosefinSans, siteConfig } from "~/config"
import { twx } from "~/utils"
import EnterButton from "./components/enter-button"
import IntroduceBentoGrid from "./components/introduce-bento-grid"

const logoCaption = [
    {
        logo: <NextjsIcon />,
        caption: "Next.js"
    },
    {
        logo: <ReactIcon />,
        caption: "React"
    },
    {
        logo: <TailwindIcon />,
        caption: "TailwindCSS"
    },
    {
        logo: <FramerMotionIcon />,
        caption: "Framer Motion"
    },
    {
        logo: <NextUiIcon />,
        caption: "NextUI"
    }
]

const LogoCaptionWrapper = twx.div`mr-4 flex items-center space-x-2`

const words = [
    {
        text: "基于React + Redux + Next.js + "
    },
    {
        text: "NextUI",
        className:
            "bg-gradient-to-r from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent"
    },
    {
        text: "🔥"
    }
]

export default function HomePage() {
    return (
        <>
            <section className='flex w-full flex-col items-center justify-between gap-4 py-8 lg:multi-["flex-row;py-10"]'>
                <div>
                    <p className={title({ color: "blue" })}>Next数字校园</p>
                    <TextGenerateEffect
                        className={title({ size: "xs", color: "foreground" })}
                        text='现代化信息技术的全新型校园管理系统'
                    />
                    <TypewriterEffectSmooth
                        words={words}
                        className='text-base font-bold text-default-600 lg:text-lg'
                        hasCursor
                    />
                    <Row space={3} className='mt-3 md:mt-10'>
                        <EnterButton />
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
                <LocalImage
                    src='/images/Meeting.svg'
                    alt='meeting'
                    width={500}
                    originalSize={{ width: 1026, height: 691 }}
                    priority
                ></LocalImage>
            </section>
            <section>
                <IntroduceBentoGrid />
            </section>
            <section className='flex w-full flex-col items-center justify-center gap-2 pt-8 text-neutral-500'>
                <p className={JosefinSans.className}>Built by</p>
                <div className='flex flex-wrap items-center justify-center overflow-x-auto scrollbar-hide'>
                    {logoCaption.map((item) => (
                        <LogoCaptionWrapper key={`logoCaption - ${item.caption}`}>
                            <span className='h-6 w-6 shrink-0 md:multi-["h-10;w-10"] *:md:multi-["h-10;w-10"]'>
                                {item.logo}
                            </span>
                            <span className='shrink-0 text-sm font-semibold'>
                                {item.caption}
                            </span>
                        </LogoCaptionWrapper>
                    ))}
                </div>
            </section>
        </>
    )
}
