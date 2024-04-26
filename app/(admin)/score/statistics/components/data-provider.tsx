"use client"

import constate from "constate"
import useSWR from "swr"

export type StatisticsData = {
    max: number
    avg: number
    min: number
    pie_chart: { name: string; value: number }[]
}

function useDataState() {
    const { data: statisticsData } = useSWR<StatisticsData>("/score/statistics/")
    return { statisticsData }
}

export const [DataProvider, useStatisticsData] = constate(
    useDataState,
    (value) => value.statisticsData
)
