import type { Metadata } from "next"

import TableCard from "@/components/business/table-card"
import { filterColumnsByArray } from "~/utils/common"

export const metadata: Metadata = {
    title: "信息管理"
}

export default function StudentInformationPage() {
    const columns = [
        { uid: "id", name: "学号", sortable: true },
        { uid: "real_name", name: "姓名" },
        { uid: "phone", name: "手机号" },
        { uid: "birth_date", name: "年龄", sortable: true },
        { uid: "gender", name: "性别", sortable: true },
        { uid: "guardian_name", name: "监护人姓名" },
        { uid: "guardian_phone", name: "监护人电话" },
        { uid: "identification_number", name: "身份证号" },
        { uid: "actions", name: "操作" }
    ]

    const statusOptions = [
        { uid: "1", name: "男" },
        { uid: "2", name: "女" }
    ]

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
                statusField='gender'
                isAddDisabled
                isDelDisabled
                statusOptions={statusOptions}
                initialInvisibleColumns={initialInvisibleColumns}
            />
        </section>
    )
}
