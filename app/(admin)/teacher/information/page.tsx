import type { Metadata } from "next"
import { ChipProps } from "@nextui-org/react"

import InformationCard from "@/components/business/information-card"
import TableCard from "@/components/business/table-card"
import { filterColumnsByArray } from "~/utils/common"
import { getUserInfoFromServer } from "~/utils/cookies"

export const metadata: Metadata = {
    title: "信息管理"
}

export default async function TeacherInformationPage() {
    const userInfo = await getUserInfoFromServer()

    const columns = [
        { uid: "id", name: "教号", sortable: true },
        { uid: "real_name", name: "姓名" },
        { uid: "phone", name: "手机号" },
        { uid: "classes", name: "所教班级", isRequired: true },
        { uid: "birth_date", name: "年龄", sortable: true },
        { uid: "service_date", name: "入职日期", sortable: true },
        { uid: "gender", name: "性别", sortable: true },
        { uid: "service_status", name: "在职状态", sortable: true },
        { uid: "identification_number", name: "身份证号" },
        { uid: "actions", name: "操作" }
    ]

    const statusOptions = [
        { uid: "1", name: "在职" },
        { uid: "2", name: "休假" },
        { uid: "3", name: "离职" }
    ]

    const statusColorMap: Record<string, ChipProps["color"]> = {
        1: "success",
        2: "warning",
        3: "danger"
    }
    const dateFields = ["birth_date", "service_date"]

    const filterColumns = filterColumnsByArray(columns, [
        "id",
        "real_name",
        "phone",
        "identification_number"
    ])
    filterColumns.push({ uid: "class_name", name: "班级名称" })

    if (userInfo?.userRole === "admin") {
        return (
            <section className='lg:h-full'>
                <TableCard
                    ariaLabel='Teacher information Table'
                    url='/teacher/information/'
                    columns={columns}
                    isAddDisabled
                    isDelDisabled
                    filterColumns={filterColumns}
                    dateFields={dateFields}
                    statusField='service_status'
                    statusOptions={statusOptions}
                    statusColorMap={statusColorMap}
                />
            </section>
        )
    }

    return (
        <section className='lg:h-full'>
            <InformationCard
                url='/teacher/information/'
                columns={columns}
                dateFields={dateFields}
                statusField='gender'
                statusOptions={[
                    { uid: "1", name: "男" },
                    { uid: "2", name: "女" }
                ]}
                disabledInput={["id", "service_date", "classes"]}
            />
        </section>
    )
}
