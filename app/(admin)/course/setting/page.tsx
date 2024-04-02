import type { Metadata } from "next"
import { ChipProps } from "@nextui-org/react"

import TableCard from "@/components/business/table-card"
import { filterColumnsByArray } from "~/utils/common"

export const metadata: Metadata = {
    title: "课程设置"
}

export default function CourseSettingPage() {
    const columns: Columns = [
        { uid: "id", name: "课程编号", sortable: true, isRequired: true },
        { uid: "course_picture", name: "课程图片" },
        { uid: "course_name", name: "课程名称", sortable: true, isRequired: true },
        { uid: "course_description", name: "课程描述" },
        { uid: "teacher", name: "教师", isRequired: true },
        { uid: "weekday", name: "上课星期" },
        { uid: "start_time", name: "上课时间", sortable: true, isRequired: true },
        { uid: "end_time", name: "下课时间", sortable: true, isRequired: true },
        { uid: "class_location", name: "上课地点", sortable: true, isRequired: true },
        { uid: "credit", name: "课程学分", sortable: true, isRequired: true },
        { uid: "course_type", name: "课程类型", sortable: true },
        { uid: "classes", name: "适用班级", isRequired: true },
        { uid: "enrollment_limit", name: "选课人数限制" },
        { uid: "start_date", name: "课程开始日期", sortable: true, isRequired: true },
        { uid: "end_date", name: "课程结束日期", sortable: true, isRequired: true },
        { uid: "notes", name: "备注" },
        { uid: "actions", name: "操作" }
    ]

    const statusOptions = [
        { uid: "1", name: "必修课" },
        { uid: "2", name: "选修课" },
        { uid: "3", name: "实践课" }
    ]

    const statusColorMap: Record<string, ChipProps["color"]> = {
        1: "success",
        2: "primary",
        3: "warning"
    }

    const dateFields = ["start_date", "end_date"]

    const filterColumns = filterColumnsByArray(columns, [
        "id",
        "real_name",
        "course_name",
        "class_location",
        "course_type"
    ])
    filterColumns.push({ uid: "class_name", name: "班级名称" })

    return (
        <section className='lg:h-full'>
            <TableCard
                ariaLabel='Course Setting Table'
                url='/course/setting/'
                columns={columns}
                filterColumns={filterColumns}
                dateFields={dateFields}
                statusField='course_type'
                statusOptions={statusOptions}
                statusColorMap={statusColorMap}
                disabledInput={["real_name"]}
                initialInvisibleColumns={["id"]}
                groupField='teacher'
                groupFetchUrl='/teacher/simple/'
            />
        </section>
    )
}
