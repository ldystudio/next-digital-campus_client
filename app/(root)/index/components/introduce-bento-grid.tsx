"use client"

import React, { useEffect, useState } from "react"

import { motion, useMotionValue } from "framer-motion"
import { Card, CardFooter, CardHeader, Chip } from "@nextui-org/react"

import { Iconify } from "@/components/common/iconify"
import { LocalImage } from "@/components/common/image"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import Meteors from "@/components/ui/meteors"
import { cn, twx } from "~/utils"
import { CardPattern, generateRandomString } from "./card-pattern"

type SkeletonProps = { text?: string; className?: string }

function SkeletonMeteors({ text, className }: SkeletonProps) {
    return (
        <div className='relative flex h-full min-h-[10rem] w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-slate-900'>
            <Meteors number={30} />
            <h1
                className={cn(
                    "z-20 text-3xl font-bold text-white md:text-4xl",
                    className
                )}
            >
                {text}
            </h1>
        </div>
    )
}

function SkeletonDialog() {
    const variants = {
        initial: {
            x: 0
        },
        animate: {
            x: 10,
            rotate: 5,
            transition: {
                duration: 0.2
            }
        }
    }
    const variantsSecond = {
        initial: {
            x: 0
        },
        animate: {
            x: -10,
            rotate: -5,
            transition: {
                duration: 0.2
            }
        }
    }
    const DialogWrapper = twx(
        motion.div
    )`flex flex-row items-center space-x-2 rounded-full border border-neutral-100 bg-white p-2 dark:border-white/[0.2] dark:bg-black`
    const Avatar = twx.div`h-6 w-6 shrink-0 rounded-full bg-gradient-to-r from-blue-200 to-cyan-200`
    const Dialog = twx.div`h-4 w-full rounded-full bg-gray-100 dark:bg-neutral-900`

    return (
        <motion.div
            initial='initial'
            whileHover='animate'
            className='flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2 bg-dot-black/[0.2] dark:bg-dot-white/[0.2]'
        >
            <DialogWrapper variants={variants}>
                <Avatar />
                <Dialog />
            </DialogWrapper>
            <DialogWrapper variants={variantsSecond} className='ml-auto w-3/4 '>
                <Dialog />
                <Avatar className='bg-gradient-to-r from-violet-200 to-pink-200' />
            </DialogWrapper>
            <DialogWrapper variants={variants}>
                <Avatar />
                <Dialog />
            </DialogWrapper>
        </motion.div>
    )
}

function SkeletonBarChart() {
    const variants = {
        initial: {
            width: 0
        },
        animate: {
            width: "100%",
            transition: {
                duration: 0.2
            }
        },
        hover: {
            width: ["0%", "100%"],
            transition: {
                duration: 2
            }
        }
    }
    const arr = new Array(6).fill(0)
    return (
        <motion.div
            initial='initial'
            animate='animate'
            whileHover='hover'
            className='flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2 bg-dot-black/[0.2] dark:bg-dot-white/[0.2]'
        >
            {arr.map((_, i) => (
                <motion.div
                    key={"skelenton-bar-chart" + i}
                    variants={variants}
                    style={{
                        maxWidth: Math.random() * (100 - 40) + 40 + "%"
                    }}
                    className='flex h-4 w-full flex-row items-center space-x-2 rounded-full border border-neutral-100 bg-gray-200 p-2 dark:border-white/[0.2] dark:bg-black'
                />
            ))}
        </motion.div>
    )
}

function SkeletonHover({ text, className }: SkeletonProps) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const [randomString, setRandomString] = useState("")

    useEffect(() => {
        const str = generateRandomString(1500)
        setRandomString(str)
    }, [])

    function onMouseMove({ currentTarget, clientX, clientY }: any) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)

        const str = generateRandomString(1500)
        setRandomString(str)
    }

    return (
        <div
            className={cn(
                "relative flex h-full min-h-[10rem] w-full items-center justify-center bg-transparent p-0.5",
                className
            )}
        >
            <div
                onMouseMove={onMouseMove}
                className='group/card relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-dot-black/[0.2] dark:bg-dot-white/[0.2]'
            >
                <CardPattern
                    mouseX={mouseX}
                    mouseY={mouseY}
                    randomString={randomString}
                />
                <div className='relative z-10 flex items-center justify-center'>
                    <div className='relative flex size-36 items-center justify-center rounded-full text-4xl font-bold text-white md:size-40'>
                        <div className='absolute h-full w-full rounded-full bg-background/80 blur-sm' />
                        <span className='z-20 text-3xl text-foreground md:text-4xl'>
                            {text}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SkeletonLinearGradient() {
    const variants = {
        initial: {
            backgroundPosition: "0 50%"
        },
        animate: {
            backgroundPosition: ["0, 50%", "100% 50%", "0 50%"]
        }
    }
    return (
        <motion.div
            initial='initial'
            animate='animate'
            variants={variants}
            transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
            }}
            className='flex h-full min-h-[6rem] w-full flex-1 flex-col items-center justify-center space-y-2 rounded-3xl bg-dot-black/[0.2] dark:bg-dot-white/[0.2]'
            style={{
                background:
                    "linear-gradient(-45deg, #ddd6fe, #fbcfe8, #bae6fd, #99f6e4)",
                backgroundSize: "400% 400%"
            }}
        >
            {/* <motion.div className='h-full w-full rounded-lg'>123</motion.div> */}
            <LocalImage
                src='/images/studying.svg'
                alt='studying'
                width={180}
                originalSize={{ width: 960, height: 960 }}
            />
        </motion.div>
    )
}

function SkeletonMultipleDevices() {
    const first = {
        initial: {
            x: 20,
            rotate: -5
        },
        hover: {
            x: 0,
            rotate: 0
        }
    }
    const second = {
        initial: {
            x: -20,
            rotate: 5
        },
        hover: {
            x: 0,
            rotate: 0
        }
    }
    const CardWrapper = twx(
        motion.div
    )`flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white dark:border-white/[0.1] dark:bg-black`

    return (
        <motion.div
            initial='initial'
            animate='animate'
            whileHover='hover'
            className='flex h-full min-h-[6rem] w-full flex-1 flex-row space-x-2 bg-dot-black/[0.2] dark:bg-dot-white/[0.2]'
        >
            <CardWrapper variants={first}>
                <Card shadow='none'>
                    <CardHeader className='items-center justify-center'>
                        <Iconify
                            icon='solar:iphone-line-duotone'
                            height={48}
                            color='primary'
                        />
                    </CardHeader>
                    <CardFooter className='items-center justify-center'>
                        <Chip color='primary' size='sm' variant='flat'>
                            手机
                        </Chip>
                    </CardFooter>
                </Card>
            </CardWrapper>
            <CardWrapper className='relative z-20'>
                <Card shadow='none'>
                    <CardHeader className='items-center justify-center'>
                        <Iconify
                            icon='solar:laptop-minimalistic-line-duotone'
                            height={48}
                            color='success'
                        />
                    </CardHeader>
                    <CardFooter className='items-center justify-center'>
                        <Chip color='success' size='sm' variant='flat'>
                            电脑
                        </Chip>
                    </CardFooter>
                </Card>
            </CardWrapper>
            <CardWrapper variants={second}>
                <Card shadow='none'>
                    <CardHeader className='items-center justify-center'>
                        <Iconify
                            icon='solar:tablet-line-duotone'
                            height={48}
                            color='warning'
                        />
                    </CardHeader>
                    <CardFooter className='items-center justify-center'>
                        <Chip color='warning' size='sm' variant='flat'>
                            平板
                        </Chip>
                    </CardFooter>
                </Card>
            </CardWrapper>
        </motion.div>
    )
}

const introduce = [
    {
        title: "模块化设计",
        description: (
            <span className='text-sm'>
                采用模块化设计，根据不同功能需求实现自定义开发和集成，保证了系统的高可扩展性和灵活性。
            </span>
        ),
        header: <SkeletonMeteors text='Modular' />,
        className: "md:col-span-1",
        icon: "solar:layers-bold-duotone"
    },
    {
        title: "安全可靠",
        description: (
            <span className='text-sm'>
                采用多重安全认证、加密存储等措施，确保数据安全和系统稳定。
            </span>
        ),
        header: <SkeletonHover text='Security' />,
        className: "md:col-span-1",
        icon: "solar:shield-keyhole-minimalistic-bold-duotone"
    },
    {
        title: "互动便捷",
        description: (
            <span className='text-sm'>
                支持移动设备访问，能够随时随地进行信息交流和共享，提升用户使用体验。
            </span>
        ),
        header: <SkeletonMultipleDevices />,
        className: "md:col-span-1",
        icon: "solar:smartphone-2-bold-duotone"
    },
    {
        title: "数据分析",
        description: (
            <span className='text-sm'>
                集成了多种数据分析和挖掘工具，通过数据分析和挖掘，提供更全面的学校管理信息支持。
            </span>
        ),
        header: <SkeletonBarChart />,
        className: "md:col-span-1",
        icon: "solar:graph-new-bold-duotone"
    },
    {
        title: "教育教学",
        description: (
            <span className='text-sm'>
                采用针对性设计，兼顾教育教学特色，提供更符合教师和学生需求的管理和学习功能。
            </span>
        ),
        header: <SkeletonLinearGradient />,
        className: "md:col-span-1",
        icon: "solar:square-academic-cap-2-bold-duotone"
    },
    {
        title: "在线沟通",
        description: (
            <span className='text-sm'>
                提供在线聊天和讨论功能，通过系统内部的消息系统进行交流和协作，方便快捷地解决问题和分享信息。
            </span>
        ),
        header: <SkeletonDialog />,
        className: "md:col-span-1",
        icon: "solar:chat-round-line-bold-duotone"
    }
]

export default function IntroduceBentoGrid() {
    return (
        <BentoGrid className='mx-auto md:auto-rows-[20rem]'>
            {introduce.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    className={cn("[&>p:text-lg] bg-default-100", item.className)}
                    icon={<Iconify icon={item.icon} height={30} color='primary' />}
                />
            ))}
        </BentoGrid>
    )
}
