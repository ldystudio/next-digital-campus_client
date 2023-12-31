/* eslint-disable tailwindcss/no-custom-classname */
import React from "react"

import ReactECharts from "echarts-for-react"
import { DayPicker } from "react-day-picker"
import { Card, CardBody, CircularProgress } from "@nextui-org/react"

import { title } from "@/components/custom"

import "react-day-picker/dist/style.css"

interface LabelCardProps {
    title: string
    number: number
    color: "primary" | "secondary" | "warning"
    desc: string
    value: number
}

export function LabelCard(props: LabelCardProps) {
    return (
        <Card className='max-h-[181px]'>
            <CardBody className='grid grid-cols-2'>
                <div className='grid grid-rows-3 items-center'>
                    <p className='text-default-400'>{props.title}</p>
                    <p className={title({ size: "sm" })}>{props.number}</p>
                    <p className={`text-${props.color} text-sm`}>{props.desc}</p>
                </div>
                <div className='flex items-center justify-center'>
                    <CircularProgress
                        aria-label={props.title}
                        value={props.value}
                        strokeWidth={4}
                        showValueLabel={true}
                        classNames={{
                            svg: "w-28 h-28 drop-shadow-md",
                            indicator: `text-${props.color}`,
                            value: `text-3xl font-semibold text-${props.color}`
                        }}
                    />
                </div>
            </CardBody>
        </Card>
    )
}

const css = `
	.my-selected:not([disabled]) { 
	font-weight: bold; 
	border: 2px solid currentColor;
	}

	.my-selected:hover:not([disabled]) { 
	border-color: blue;
	color: blue;
	}

	.my-today { 
	color: #0070f0;
	background-color: #e6f7ff;
	}
`

export function Calendar() {
    const [selected, setSelected] = React.useState<Date>()

    // let footer = <p>Please pick a day.</p>;
    // if (selected) {
    // 	footer = <p>You picked {format(selected, "PP")}.</p>;
    // }

    return (
        <>
            <style>{css}</style>
            <DayPicker
                mode='single'
                selected={selected}
                onSelect={setSelected}
                showOutsideDays
                // fixedWeeks
                ISOWeek
                captionLayout='dropdown-buttons'
                modifiersClassNames={{
                    selected: "my-selected",
                    today: "my-today"
                }}
                // footer={footer}
            />
        </>
    )
}

export function LineCharts() {
    const option = {
        title: {
            text: "堆叠区域图"
        },
        tooltip: {
            trigger: "axis"
        },
        legend: {
            data: ["邮件营销", "联盟广告", "视频广告"]
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            }
        ],
        yAxis: [
            {
                type: "value"
            }
        ],
        series: [
            {
                name: "邮件营销",
                type: "line",
                stack: "总量",
                areaStyle: { normal: {} },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: "联盟广告",
                type: "line",
                stack: "总量",
                areaStyle: { normal: {} },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: "视频广告",
                type: "line",
                stack: "总量",
                areaStyle: { normal: {} },
                data: [150, 232, 201, 154, 190, 330, 410]
            }
        ]
    }

    return <ReactECharts option={option} style={{ height: "100%" }} />
}
