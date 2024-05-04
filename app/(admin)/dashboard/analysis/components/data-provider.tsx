"use client"

import constate from "constate"
import { useQuery } from "@tanstack/react-query"

import { getAuthState } from "~/store"

type ChartDataType = {
    title: string
    describe: string
    subDescribe?: string
    number?: number
    floating?: string
    data: number[]
}

type ChartData = {
    chart1: ChartDataType
    chart2: ChartDataType
    chart3: ChartDataType
    large_chart: {
        chart1: {
            title: string
            data: number[]
        }
        chart2: {
            title: string
            data: number[]
        }
        chart3: {
            series1: {
                name: string
                data: number[]
            }
            series2: {
                name: string
                data: number[]
            }
        }
    }
}

type AnalyticsDataType = {
    title: string
    describe: string
    icon: string
    numValue?: number
}

type AnalyticsData = {
    first: AnalyticsDataType
    second: AnalyticsDataType
    third: AnalyticsDataType
    fourth: AnalyticsDataType
}

function useDataState() {
    const { data: chartData, isPending } = useQuery<ChartData>({
        queryKey: ["/dashboard/chart/"]
    })
    const { data: analyticsData } = useQuery<AnalyticsData>({
        queryKey: ["/dashboard/analytics/"]
    })
    const userInfo = getAuthState().userInfo
    return { chartData, analyticsData, isPending, userInfo }
}

export const [DataProvider, useChartData, useAnalyticsData, useIsPending, useUserInfo] =
    constate(
        useDataState,
        (value) => value.chartData,
        (value) => value.analyticsData,
        (value) => value.isPending,
        (value) => value.userInfo
    )
