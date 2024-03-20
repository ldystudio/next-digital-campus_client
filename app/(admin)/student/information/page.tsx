import type { Metadata } from "next"
import { ChipProps } from "@nextui-org/react"

import TableCard from "@/components/business/table-card"
import filterColumnsByArray from "~/utils/common/filter-columns-by-array"

export const metadata: Metadata = {
    title: "信息管理"
}

export default function StudentInformationPage() {
    const columns = [
        { uid: "id", name: "学号", sortable: true },
        { uid: "real_name", name: "姓名" },
        { uid: "phone", name: "手机号" },
        { uid: "class_name", name: "班级", sortable: true },
        { uid: "birth_date", name: "年龄", sortable: true },
        { uid: "date_of_admission", name: "入学日期", sortable: true },
        { uid: "gender", name: "性别", sortable: true },
        { uid: "guardian_name", name: "监护人姓名" },
        { uid: "guardian_phone", name: "监护人电话" },
        { uid: "enrollment_status", name: "就读状态", sortable: true },
        { uid: "identification_number", name: "身份证号" },
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

    const dateFields = ["birth_date", "date_of_admission"]

    const initialInvisibleColumns = ["guardian_name", "guardian_phone"]

    const filterColumns = filterColumnsByArray(columns, [
        "id",
        "real_name",
        "phone",
        "identification_number"
    ])

    return (
        <section className='lg:h-full'>
            <TableCard
                ariaLabel='Student information Table'
                url='/student/information/'
                columns={columns}
                filterColumns={filterColumns}
                dateFields={dateFields}
                statusField='enrollment_status'
                statusOptions={statusOptions}
                statusColorMap={statusColorMap}
                initialInvisibleColumns={initialInvisibleColumns}
            />
        </section>
    )
}
