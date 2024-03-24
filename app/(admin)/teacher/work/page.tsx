import type { Metadata } from "next"

import TableCard from "@/components/business/table-card"
import { filterColumnsByArray } from "~/utils/common"

export const metadata: Metadata = {
    title: "工作安排"
}

export default function TeacherWorkPage() {
    const columns = [
        { uid: "id", name: "工作单号", sortable: true },
        { uid: "real_name", name: "姓名", sortable: true },
        { uid: "work_date", name: "工作日期", sortable: true },
        { uid: "work_time", name: "工作时间", sortable: true },
        { uid: "course_name", name: "课程名称", sortable: true },
        { uid: "course_class", name: "课程班级", sortable: true },
        { uid: "meeting_name", name: "会议名称" },
        { uid: "location", name: "会议地点" },
        { uid: "work_content", name: "工作内容" },
        { uid: "notes", name: "备注" },
        { uid: "actions", name: "操作" }
    ]

    const dateFields = ["work_date"]

    const filterColumns = filterColumnsByArray(columns, [
        "id",
        "real_name",
        "work_date",
        "course_name",
        "course_class"
    ])

    return (
        <section className='lg:h-full'>
            <TableCard
                ariaLabel='Teacher Work Table'
                url='/teacher/work/'
                columns={columns}
                filterColumns={filterColumns}
                dateFields={dateFields}
                disabledInput={["real_name"]}
                initialInvisibleColumns={["id"]}
            />
        </section>
    )
}
