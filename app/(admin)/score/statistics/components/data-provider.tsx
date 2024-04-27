"use client"

import constate from "constate"
import { useQuery } from "@tanstack/react-query"

export type StatisticsData = {
    max: number
    avg: number
    min: number
    pie_chart: { name: string; value: number }[]
}

function useDataState() {
    const { data: statisticsData } = useQuery<StatisticsData>({
        queryKey: ["/score/statistics/"]
    })
    return { statisticsData }
}

export const [DataProvider, useStatisticsData] = constate(
    useDataState,
    (value) => value.statisticsData
)
