"use client"

import { EChartsOption } from "echarts"
import EChartsReact from "echarts-for-react"
import _ from "lodash"
import useSWR from "swr"
import { Card } from "@nextui-org/react"

import { Col } from "@/components/common/dimension"
import { request } from "~/service/request"
import { twx } from "~/utils"

const CardWrapper = twx(
    Card
)`hidden h-1/2 items-center justify-center lg:multi-["flex;w-full"]`

const fetcher = (url: string) => request.get<any>(url).then((res) => res.data)
function useScoreData(year: number | string) {
    const { data } = useSWR(`/score/peacetime/?year=${year}`, fetcher, {
        revalidateOnFocus: false
    })
    return data
}

export default function ScoreChart() {
    const data = useScoreData(2024)
    const dateList = _.uniq(_.flatMap(data, (dates) => _.map(dates, (date) => date[0])))

    const series: EChartsOption["series"] = Object.keys(data ?? {}).map((key) => ({
        name: key,
        type: "line",
        smooth: true,
        showSymbol: false,
        data: data[key]
    }))

    /** @type EChartsOption */
    const option: EChartsOption = {
        visualMap: {
            show: false,
            type: "continuous",
            dimension: 0,
            min: 0,
            max: dateList.length - 1
        },
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
            <CardWrapper>456</CardWrapper>
        </Col>
    )
}
