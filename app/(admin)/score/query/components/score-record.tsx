"use client"

import React from "react"

import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import useSWR from "swr"
import * as adventurer from "@dicebear/adventurer"
import { createAvatar } from "@dicebear/core"
import { Avatar } from "@nextui-org/avatar"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Chip } from "@nextui-org/chip"
import { Tab, Tabs } from "@nextui-org/tabs"

import { request } from "~/service/request"
import UserPost from "./user-post"

type StudentDetail = {
    id: string
    date_of_admission: string
    enrollment_status: string
    class_name: string
    real_name: string
    email: string
    avatar: string
}

const fetcher = (url: string) =>
    request.get<StudentDetail[]>(url).then((res) => res.data)

export default function ScoreRecord() {
    const { data } = useSWR("/student/simple-detail/", fetcher, {
        revalidateOnFocus: false
    })

    const studentDetail = data?.[0]

    return (
        <Card
            className='h-full items-center justify-center lg:w-1/3 lg:min-w-96'
            shadow='none'
        >
            <CardHeader className='flex h-[100px] flex-col justify-end overflow-visible bg-gradient-to-r from-violet-200 to-pink-200'>
                {studentDetail && (
                    <Avatar
                        className='h-20 w-20 translate-y-12'
                        isBordered
                        src={createAvatar(adventurer, {
                            seed: studentDetail.avatar
                        }).toDataUriSync()}
                        name={studentDetail.real_name}
                    />
                )}
            </CardHeader>
            <OverlayScrollbarsComponent
                defer
                options={{
                    scrollbars: {
                        autoHide: "scroll",
                        autoHideDelay: 500
                    }
                }}
                className='h-full overflow-y-auto'
            >
                <CardBody>
                    <p className='text-large font-medium'>{studentDetail?.real_name}</p>
                    <p className='max-w-[90%] text-small text-default-400'>
                        {studentDetail?.email}
                    </p>
                    <div className='flex gap-2 pb-1 pt-2'>
                        <Chip variant='flat'>
                            {studentDetail?.date_of_admission.split("-")[0]}级
                        </Chip>
                        <Chip variant='flat'>{studentDetail?.class_name}</Chip>
                        <Chip variant='flat'>{studentDetail?.enrollment_status}</Chip>
                    </div>
                    <p className='py-2 text-small text-foreground'>
                        Creator of Radify Icons Set. 500+ icons in 6 styles, SVG and
                        Figma files, and more.
                    </p>
                    <div className='flex gap-2'>
                        <p>
                            <span className='text-small font-medium text-default-500'>
                                13
                            </span>
                            &nbsp;
                            <span className='text-small text-default-400'>
                                Following
                            </span>
                        </p>
                        <p>
                            <span className='text-small font-medium text-default-500'>
                                2500
                            </span>
                            &nbsp;
                            <span className='text-small text-default-400'>
                                Followers
                            </span>
                        </p>
                    </div>
                    <Tabs
                        fullWidth
                        classNames={{
                            panel: "mt-2"
                        }}
                        className='mt-2'
                    >
                        <Tab key='regular grades' title='平时成绩'>
                            {Array.from({ length: 6 }).map((_, i) => (
                                <UserPost
                                    key={i}
                                    avatar='https://i.pravatar.cc/150?u=a04258114e29026708c'
                                    comments={12}
                                    date='2021-08-01'
                                    likes={123}
                                    name='Tony Reichert'
                                    text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.'
                                    username='@tony.reichert'
                                />
                            ))}
                        </Tab>
                        <Tab key='mid-term grades' title='期中成绩'>
                            {Array.from({ length: 2 }).map((_, i) => (
                                <UserPost
                                    key={i}
                                    avatar='https://i.pravatar.cc/150?u=a04258114e29026708c'
                                    comments={12}
                                    date='2021-08-01'
                                    likes={123}
                                    name='Tony Reichert'
                                    text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.'
                                    username='@tony.reichert'
                                />
                            ))}
                        </Tab>
                        <Tab key='final grades' title='期末成绩'>
                            {Array.from({ length: 1 }).map((_, i) => (
                                <UserPost
                                    key={i}
                                    avatar='https://i.pravatar.cc/150?u=a04258114e29026708c'
                                    comments={12}
                                    date='2021-08-01'
                                    likes={123}
                                    name='Tony Reichert'
                                    text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.'
                                    username='@tony.reichert'
                                />
                            ))}
                        </Tab>
                    </Tabs>
                </CardBody>
            </OverlayScrollbarsComponent>
        </Card>
    )
}
