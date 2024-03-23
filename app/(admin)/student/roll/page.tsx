import type { Metadata } from "next"
import { ChipProps } from "@nextui-org/react"

import TableCard from "@/components/business/table-card"
import { filterColumnsByArray } from "~/utils/common"

export const metadata: Metadata = {
    title: "学籍管理"
}

export default function StudentRollPage() {
    const columns = [
        { uid: "id", name: "学籍号", sortable: true },
        { uid: "real_name", name: "姓名" },
        { uid: "class_name", name: "班级", sortable: true },
        { uid: "date_of_admission", name: "入学日期", sortable: true },
        { uid: "date_of_graduation", name: "毕业日期", sortable: true },
        { uid: "address", name: "家庭住址" },
        { uid: "disciplinary_records", name: "奖惩记录" },
        { uid: "enrollment_status", name: "就读状态", sortable: true },
        { uid: "notes", name: "备注" },
        { uid: "actions", name: "操作" }
    ]

    const statusOptions = [
        { uid: "1", name: "在校" },
        { uid: "2", name: "休学" },
        { uid: "3", name: "毕业" }
    ]

    const statusColorMap: Record<string, ChipProps["color"]> = {
        1: "success",
        2: "warning",
        3: "danger"
    }

    const dateFields = ["date_of_admission", "date_of_graduation"]

    const filterColumns = filterColumnsByArray(columns, [
        "id",
        "real_name",
        "class_name",
        "address"
    ])

    return (
        <section className='lg:h-full'>
            <TableCard
                ariaLabel='Student roll Table'
                url='/student/enrollment/'
                columns={columns}
                filterColumns={filterColumns}
                isAddDisabled
                isDelDisabled
                dateFields={dateFields}
                statusField='enrollment_status'
                statusOptions={statusOptions}
                statusColorMap={statusColorMap}
            />
        </section>
    )
}
