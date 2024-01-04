"use client"

import type { ECharts } from "echarts"
import EChartsReact, { EChartsReactProps } from "echarts-for-react"

export function ECharts(props: EChartsReactProps) {
    return <EChartsReact {...props} />
}
