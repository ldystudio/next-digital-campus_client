"use client"

import React from "react"

import { EChartsOption } from "echarts"
import EChartsReact from "echarts-for-react"
import _ from "lodash"
import { Card, CardHeader } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"

import { Col } from "@/components/common/dimension"
import Scrollbar from "@/components/common/scrollbar"
import { NotoSansSC } from "~/config"
import { twx } from "~/utils"
import MessageCard from "./message-card"
import { useYear } from "./year-provider"

// prettier-ignore
const CardWrapper = twx(Card)`w-full h-1/2 items-center justify-center`

type ScoreData = { [courseName: string]: [string, number][] }

function useScoreData(year: number | string) {
    return useQuery<ScoreData>({ queryKey: [`/score/peacetime/?year=${year}`] }).data
}

function useAIAdviseData(year: number | string) {
    return useQuery<string>({ queryKey: [`/score/ai-advise/?year=${year}`] })
}

export default function ScoreChart() {
    const year = useYear()
    const scoreData = useScoreData(year)
    const { data: adviseData, isPending, error } = useAIAdviseData(year)

    const dateList = _.sortBy(
        _.uniq(_.flatMap(scoreData, (dates) => _.map(dates, (date) => date[0]))),
        (date) => date
    )

    const series: EChartsOption["series"] = Object.keys(scoreData ?? {}).map((key) => ({
        name: key,
        type: "line",
        smooth: true,
        showSymbol: false,
        data: scoreData?.[key]
    }))

    /** @type EChartsOption */
    const option: EChartsOption = {
        title: {
            top: "3%",
            left: "center",
            text: "平时成绩走势图"
        },
        tooltip: {
            trigger: "axis"
        },
        legend: {
            bottom: "3%",
            left: "3%"
        },
        xAxis: {
            type: "category",
            data: dateList
        },
        yAxis: {
            type: "value"
        },
        series
    }

    return (
        <Col fullWidth space={5}>
            <CardWrapper className='hidden lg:flex'>
                <EChartsReact
                    option={option}
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                    opts={{ renderer: "svg" }}
                />
            </CardWrapper>
            <CardWrapper>
                <CardHeader className='text-lg font-bold'>AI学习建议</CardHeader>
                <Scrollbar className='h-full w-full p-3 bg-dot-black/[0.2] dark:bg-dot-white/[0.2]'>
                    <MessageCard
                        avatar='/images/icon/zhipuai.png'
                        status={adviseData && !error ? "success" : "failed"}
                        isLoading={isPending}
                        showFeedback
                        messageClassName={`${NotoSansSC.className} text-base`}
                        message={
                            <div
                                dangerouslySetInnerHTML={{ __html: adviseData ?? "" }}
                            />
                        }
                    />
                </Scrollbar>
            </CardWrapper>
        </Col>
    )
}
