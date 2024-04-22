"use client"

import { EChartsOption } from "echarts"
import EChartsReact from "echarts-for-react"
import _ from "lodash"
import Markdown from "react-markdown"
import useSWR from "swr"
import { Card, CardHeader, Textarea } from "@nextui-org/react"

import { Col } from "@/components/common/dimension"
import Scrollbar from "@/components/common/scrollbar"
import { twx } from "~/utils"
import { useYear } from "./year-provider"

// prettier-ignore
const CardWrapper = twx(Card)`hidden h-1/2 items-center justify-center lg:multi-["flex;w-full"]`

function useScoreData(year: number | string) {
    return useSWR(`/score/peacetime/?year=${year}`, {
        revalidateOnFocus: false
    }).data
}

export default function ScoreChart() {
    const year = useYear()
    const data = useScoreData(year)
    const dateList = _.sortBy(
        _.uniq(_.flatMap(data, (dates) => _.map(dates, (date) => date[0]))),
        (date) => date
    )

    const series: EChartsOption["series"] = Object.keys(data ?? {}).map((key) => ({
        name: key,
        type: "line",
        smooth: true,
        showSymbol: false,
        data: data[key]
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
    const textWithNewlines =
        "根据您提供的学生2023年的学习成绩，以下是对您学业的建议：\n\n### 学习成绩概览\n- **平时考试**：\n  - 日期 | 成绩\n  | --- | ---\n  | 2023-04-01 | 45\n  | 2023-04-02 | 57\n  | 2023-04-06 | 66\n  | 2023-04-16 | 73\n  | 2023-04-27 | 86\n  | 2023-05-07 | 67\n  | 2023-05-17 | 74\n- **期中考试**：\n  - 日期 | 成绩\n  | --- | ---\n  | 2024-04-15 | 88\n  | 2024-04-16 | 78\n\n### 成绩分析\n- 您在**平时考试**中的成绩逐渐提升，特别是在后期，这表明您有能力在学业上取得进步。从4月的45分到5月的67分，您显示了明显的进步趋势。\n- 在**期中考试**中，您取得了88分的高分，显示出您在复习和准备大型考试方面做得很好。\n\n### 学业建议\n1. **持续努力**：保持您在后期考试中的学习劲头和努力，确保每次考试都能有所进步。\n2. **加强基础**：对于考试成绩较低的考试（如第一次平时考试的45分），建议复习相关基础知识，确保对概念有深入理解。\n3. **定期复习**：由于期中考试的成绩优异，建议您定期复习学习材料，以维持和提高您的成绩。\n4. **管理时间**：合理安排学习时间，确保有足够的时间复习和准备每一次考试。\n\n希望这些建议能对您的学业有所帮助。如果您需要更具体的辅导或有其他问题，请随时告知。祝您学业有成！"
    return (
        <Col fullWidth space={5}>
            <CardWrapper>
                <EChartsReact
                    option={option}
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                    opts={{ renderer: "svg" }}
                />
            </CardWrapper>
            <CardWrapper className='whitespace-pre-wrap'>
                <CardHeader className='text-lg font-bold'>学业建议</CardHeader>
                <Scrollbar className='w-full p-3 bg-dot-black/[0.2] dark:bg-dot-white/[0.2]'>
                    <Markdown>{textWithNewlines}</Markdown>
                </Scrollbar>
            </CardWrapper>
        </Col>
    )
}
