"use client"

import _sortBy from "lodash/sortBy"
import {
    Card,
    CardBody,
    CardHeader,
    Chip,
    Select,
    SelectItem,
    Tab,
    Tabs
} from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"

import DicebearAvatar from "@/components/common/avatar"
import Scrollbar from "@/components/common/scrollbar"
import {
    generateSchoolYears,
    getCurrentAndFutureSchoolYears
} from "~/utils/common/date"
import ScoreCard, { ScoreQuery } from "./score-post"
import { useSetYear, useYear } from "./year-provider"

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

function useStudentDetail() {
    return useQuery<StudentDetail[]>({
        queryKey: ["/student/simple-detail/"]
    }).data?.[0]
}

function useScoreData(year: string | number) {
    return useQuery<ApiPage.Query<ScoreQuery>>({
        queryKey: [`/score/query/?year=${year}`]
    }).data?.results
}

export default function ScoreRecord() {
    const year = useYear()
    const setYear = useSetYear()

    const studentDetail = useStudentDetail()
    const schoolYears = generateSchoolYears(
        studentDetail?.date_of_admission.split("-")[0],
        4
    )
    const [currentSchoolYear, futureSchoolYears] =
        getCurrentAndFutureSchoolYears(schoolYears)

    const scoreData = _sortBy(useScoreData(year), ["-exam_date"])

    return (
        <Card className='h-full items-center justify-center lg:multi-["w-1/3;min-w-96"]'>
            <CardHeader className='flex h-[100px] flex-col justify-end overflow-visible bg-gradient-to-r from-violet-200 to-pink-200'>
                <DicebearAvatar
                    className='h-20 w-20 translate-y-12'
                    isBordered
                    avatar={studentDetail?.avatar ?? ""}
                    name={studentDetail?.real_name}
                />
            </CardHeader>
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
                            onSelectionChange={(year) => {
                                setYear([...year].join())
                            }}
                        >
                            {(year) => (
                                <SelectItem key={year.value}>{year.label}</SelectItem>
                            )}
                        </Select>
                    </div>
                )}
                <Scrollbar className='h-full w-full overflow-y-auto'>
                    <Tabs
                        fullWidth
                        className='mt-3'
                        classNames={{ panel: "flex flex-col gap-3" }}
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
                </Scrollbar>
            </CardBody>
        </Card>
    )
}
