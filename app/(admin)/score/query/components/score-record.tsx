"use client"

import React from "react"

import useSWR from "swr"
import * as adventurer from "@dicebear/adventurer"
import { createAvatar } from "@dicebear/core"
import {
    Avatar,
    Card,
    CardBody,
    CardHeader,
    Chip,
    Select,
    SelectItem,
    Tab,
    Tabs
} from "@nextui-org/react"

import Scrollbar from "@/components/common/scrollbar"
import { request } from "~/service/request"
import {
    generateSchoolYears,
    getCurrentAndFutureSchoolYears
} from "~/utils/common/date"
import ScoreCard, { ScoreQuery } from "./score-post"

type StudentDetail = {
    id: string
    date_of_admission: string
    enrollment_status: string
    class_name: string
    real_name: string
    email: string
    avatar: string
    signature: string | null
}

const studentDetailFetcher = (url: string) =>
    request.get<StudentDetail[]>(url).then((res) => res.data)
const scoreFetcher = (url: string) =>
    request.get<ApiPage.Query<ScoreQuery>>(url).then((res) => res.data)

function useStudentDetail() {
    const { data } = useSWR("/student/simple-detail/", studentDetailFetcher, {
        revalidateOnFocus: false
    })
    return data?.[0]
}

function useScoreData(year: string | number) {
    const { data } = useSWR(`/score/query/?year=${year}`, scoreFetcher, {
        revalidateOnFocus: false
    })
    return data?.results
}

export default function ScoreRecord() {
    const [year, setYear] = React.useState<string | number>(new Date().getFullYear())

    const studentDetail = useStudentDetail()
    const schoolYears = generateSchoolYears(
        studentDetail?.date_of_admission.split("-")[0],
        4
    )
    const [currentSchoolYear, futureSchoolYears] =
        getCurrentAndFutureSchoolYears(schoolYears)

    const scoreData = useScoreData(year)

    return (
        <Card className='h-full items-center justify-center lg:w-1/3 lg:min-w-96'>
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
            <Scrollbar className='h-full w-full overflow-y-auto'>
                <CardBody>
                    <p className='text-large font-medium'>{studentDetail?.real_name}</p>
                    <p className='max-w-[90%] text-small text-default-400'>
                        {studentDetail?.email}
                    </p>
                    <div className='flex gap-2 pb-1 pt-2'>
                        <Chip variant='flat'>
                            {studentDetail?.date_of_admission.split("-")[0]}级
                        </Chip>
                        <Chip variant='flat'>
                            {studentDetail?.class_name ?? "未知班级"}
                        </Chip>
                        <Chip variant='flat'>{studentDetail?.enrollment_status}</Chip>
                    </div>
                    <p className='py-2 text-small text-foreground'>
                        {studentDetail?.signature ?? "写段签名介绍自己吧"}
                    </p>
                    {studentDetail && (
                        <div>
                            <Select
                                aria-label='学年'
                                items={schoolYears}
                                placeholder='选择学年'
                                defaultSelectedKeys={currentSchoolYear}
                                disabledKeys={futureSchoolYears}
                                onSelectionChange={(year) => setYear([...year].join())}
                            >
                                {(year) => (
                                    <SelectItem key={year.value}>
                                        {year.label}
                                    </SelectItem>
                                )}
                            </Select>
                        </div>
                    )}
                    <Tabs
                        fullWidth
                        className='mt-3'
                        classNames={{ panel: "px-0 flex flex-col gap-3" }}
                    >
                        <Tab key='1' title='平时成绩'>
                            {scoreData
                                ?.filter((score) => score.exam_type === 1)
                                .map((score, index) => (
                                    <ScoreCard
                                        key={index}
                                        icon='solar:book-2-line-duotone'
                                        course_name={score.course_name}
                                        exam_date={score.exam_date}
                                        exam_score={score.exam_score}
                                    />
                                ))}
                        </Tab>
                        <Tab key='2' title='期中成绩'>
                            {scoreData
                                ?.filter((score) => score.exam_type === 2)
                                .map((score, index) => (
                                    <ScoreCard
                                        key={index}
                                        icon='solar:book-2-line-duotone'
                                        course_name={score.course_name}
                                        exam_date={score.exam_date}
                                        exam_score={score.exam_score}
                                    />
                                ))}
                        </Tab>
                        <Tab key='3' title='期末成绩'>
                            {scoreData
                                ?.filter((score) => score.exam_type === 3)
                                .map((score, index) => (
                                    <ScoreCard
                                        key={index}
                                        icon='solar:book-2-line-duotone'
                                        course_name={score.course_name}
                                        exam_date={score.exam_date}
                                        exam_score={score.exam_score}
                                    />
                                ))}
                        </Tab>
                    </Tabs>
                </CardBody>
            </Scrollbar>
        </Card>
    )
}
