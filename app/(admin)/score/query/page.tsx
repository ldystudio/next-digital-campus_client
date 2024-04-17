import type { Metadata } from "next"
import { ChipProps } from "@nextui-org/react"

import TableCard from "@/components/business/table-card"
import { filterColumnsByArray } from "~/utils/common"
import { getUserInfoFromServer } from "~/utils/cookies"
import ScoreCard from "./components/score-card"

export const metadata: Metadata = {
    title: "成绩查询"
}

export default async function ScoreQueryPage() {
    const userInfo = await getUserInfoFromServer()

    const columns: Columns = [
        { uid: "id", name: "分数ID", sortable: true },
        { uid: "course", name: "课程名称", isRequired: true },
        { uid: "student", name: "学生", isRequired: true },
        { uid: "exam_type", name: "考试类型", sortable: true, isRequired: true },
        { uid: "exam_date", name: "考试日期", sortable: true, isRequired: true },
        { uid: "exam_score", name: "考试分数", sortable: true, isRequired: true },
        { uid: "entered_by", name: "录入者" },
        { uid: "actions", name: "操作" }
    ]
    const statusOptions = [
        { uid: "1", name: "平时考试" },
        { uid: "2", name: "期中考试" },
        { uid: "3", name: "期末考试" }
    ]

    const statusColorMap: Record<string, ChipProps["color"]> = {
        1: "success",
        2: "primary",
        3: "warning"
    }

    const dateFields = ["exam_date"]

    const filterColumns = filterColumnsByArray(columns, [
        "id",
        "student",
        "course",
        "exam_date",
        "entered_by"
    ])

    if (userInfo?.userRole !== "student") {
        return (
            <section className='lg:h-full'>
                <TableCard
                    ariaLabel='Score query Table'
                    url='/score/query/'
                    columns={columns}
                    filterColumns={filterColumns}
                    dateFields={dateFields}
                    statusField='exam_type'
                    statusOptions={statusOptions}
                    statusColorMap={statusColorMap}
                    disabledInput={["entered_by"]}
                    initialInvisibleColumns={["id"]}
                />
            </section>
        )
    }

    return (
        <section className='lg:h-full'>
            <ScoreCard />
        </section>
    )
}
