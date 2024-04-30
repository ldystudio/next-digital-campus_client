"use client"

import constate from "constate"
import { useQuery } from "@tanstack/react-query"

export type StatisticsData = {
    max: number
    avg: number
    min: number
    class_rank: string
    best_course: string
    worst_course: string
    pie_chart: { name: string; value: number }[]
    bar_chart: {
        years: number[]
        names: string[]
        values: { [key: string]: [null | number][] }
    }
    word_cloud: { name: string; value: number }[]
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
