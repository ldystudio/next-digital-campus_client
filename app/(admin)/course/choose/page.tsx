import type { Metadata } from "next"

import { filterColumnsByArray } from "~/utils/common"
import CourseListCard from "./components/course-card"

export const metadata: Metadata = {
    title: "选课管理"
}

export default async function CourseChoosePage() {
    const columns: Columns = [
        { uid: "id", name: "课程编号" },
        { uid: "course_name", name: "课程名称" },
        { uid: "course_description", name: "课程描述" },
        { uid: "course_picture", name: "课程图片" },
        { uid: "class_location", name: "上课地点" },
        { uid: "credit", name: "课程学分" },
        { uid: "start_time", name: "上课时间" },
        { uid: "end_time", name: "下课时间" },
        { uid: "start_date", name: "开课时间" },
        { uid: "end_date", name: "结课时间" },
        { uid: "choose_number", name: "已选人数" },
        { uid: "weekday", name: "上课星期" },
        { uid: "teacher", name: "教师" }
    ]

    const filterColumns = filterColumnsByArray(columns, [
        "id",
        "real_name",
        "course_name",
        "class_location"
    ])
    filterColumns.push({ uid: "real_name", name: "教师名称" })

    return (
        <section className='lg:h-full'>
            <CourseListCard
                url='/course/choose/'
                columns={columns}
                filterColumns={filterColumns}
            />
        </section>
    )
}
