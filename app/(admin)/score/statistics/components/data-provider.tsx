"use client"

import constate from "constate"
import { useQuery } from "@tanstack/react-query"

export type StatisticsData = {
    max: number
    avg: number
    min: number
    pie_chart: { name: string; value: number }[]
    bar_chart: {
        years: number[]
        names: string[]
        values: { [name: string]: [null | number][] }
    }
}

function useDataState() {
    const { data: statisticsData, isPending } = useQuery<StatisticsData>({
        queryKey: ["/score/statistics/"]
    })
    return { statisticsData, isPending }
}

export const [DataProvider, useStatisticsData, useIsPending] = constate(
    useDataState,
    (value) => value.statisticsData,
    (value) => value.isPending
)
