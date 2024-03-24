import type { Metadata } from "next"
import { ChipProps } from "@nextui-org/react"

import TableCard from "@/components/business/table-card"
import { filterColumnsByArray } from "~/utils/common"

export const metadata: Metadata = {
    title: "考勤管理"
}

export default function TeacherAttendancePage() {
    const columns = [
        { uid: "id", name: "考勤号", sortable: true },
        { uid: "real_name", name: "姓名", sortable: true },
        { uid: "date", name: "记录日期", sortable: true },
        { uid: "attendance_status", name: "考勤状态", sortable: true },
        { uid: "check_in_time", name: "记录时间", sortable: true },
        { uid: "late_time", name: "迟到时间" },
        { uid: "early_leave_time", name: "早退时间" },
        { uid: "leave_start_time", name: "请假开始时间", sortable: true },
        { uid: "leave_end_time", name: "请假结束时间" },
        { uid: "leave_reason", name: "请假理由" },
        { uid: "notes", name: "备注" },
        { uid: "actions", name: "操作" }
    ]

    const statusOptions = [
        { uid: "1", name: "出勤" },
        { uid: "2", name: "迟到" },
        { uid: "3", name: "早退" },
        { uid: "4", name: "请假" },
        { uid: "5", name: "缺勤" }
    ]

    const statusColorMap: Record<string, ChipProps["color"]> = {
        1: "success",
        2: "primary",
        3: "warning",
        4: "secondary",
        5: "danger"
    }

    const dateFields = ["date", "leave_start_time", "leave_end_time"]

    const filterColumns = filterColumnsByArray(columns, [
        "id",
        "real_name",
        "date",
        "check_in_time",
        "leave_start_time"
    ])

    return (
        <section className='lg:h-full'>
            <TableCard
                ariaLabel='Teacher Attendance Table'
                url='/teacher/attendance/'
                columns={columns}
                filterColumns={filterColumns}
                dateFields={dateFields}
                statusField='attendance_status'
                statusOptions={statusOptions}
                statusColorMap={statusColorMap}
                disabledInput={['real_name']}
                initialInvisibleColumns={["id"]}
            />
        </section>
    )
}
