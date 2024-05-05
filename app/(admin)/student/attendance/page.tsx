import type { Metadata } from "next"
import { ChipProps } from "@nextui-org/react"

import AttendanceCard from "@/components/business/attendance-card"
import AttendanceChartCard from "@/components/business/attendance-chart-card"
import TableCard from "@/components/business/table-card"
import { filterColumnsByArray } from "~/utils/common"
import { getUserInfoFromServer } from "~/utils/cookies"

export const metadata: Metadata = {
    title: "考勤管理"
}

export default async function StudentAttendancePage() {
    const userInfo = await getUserInfoFromServer()

    const columns = [
        { uid: "id", name: "考勤号", sortable: true },
        { uid: "real_name", name: "姓名", sortable: true },
        { uid: "date", name: "记录日期", sortable: true },
        { uid: "attendance_status", name: "考勤状态", sortable: true },
        { uid: "check_in_time", name: "记录时间", sortable: true },
        { uid: "ip_address", name: "IP地址" },
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

    if (userInfo?.userRole === "admin") {
        return (
            <section className='lg:h-full'>
                <TableCard
                    ariaLabel='Student Attendance Table'
                    url='/student/attendance/'
                    columns={columns}
                    filterColumns={filterColumns}
                    dateFields={dateFields}
                    statusField='attendance_status'
                    statusOptions={statusOptions}
                    statusColorMap={statusColorMap}
                    disabledInput={["real_name"]}
                    initialInvisibleColumns={["id"]}
                />
            </section>
        )
    }

    return (
        <section className='flex flex-col gap-3 *:rounded-3xl lg:multi-["h-full;flex-row;gap-5"]'>
            <AttendanceCard
                getUrl='/student/attendance-today/'
                postUrl='/student/attendance/'
                getAllUrl='/student/attendance-all/'
            />
            <AttendanceChartCard url='/student/attendance-all/' />
        </section>
    )
}
