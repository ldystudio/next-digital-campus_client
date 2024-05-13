import {
    eachDayOfInterval,
    endOfWeek,
    format,
    isSameDay,
    isSameYear,
    isToday,
    startOfWeek
} from "date-fns"

import { isString } from "~/utils/common"

interface SchoolYear {
    label: string
    value: string
}

export function getFormattedWeekDates() {
    // 获取本周的开始日期和结束日期
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 }) // 1 表示周一为一周的开始
    const endDate = endOfWeek(new Date(), { weekStartsOn: 1 })
    // 获取本周的日期数组
    const weekDates = eachDayOfInterval({ start: startDate, end: endDate })
    // 格式化日期并过滤成 "MM-DD" 的格式，如果是今天则替换为 "今天"
    const formattedDates = weekDates.map((date) => {
        if (isToday(date)) {
            return "今天"
        } else {
            return format(date, "MM-dd")
        }
    })
    return formattedDates
}

export function createCircularIterator(array: string[]) {
    let index = 0

    return function () {
        const value = array[index]
        index = (index + 1) % array.length // 计算下一个索引，如果到达数组尾部，则返回第一个元素
        return value
    }
}

export function generateSchoolYears(
    startYear: string | number | undefined,
    numYears: number
) {
    const schoolYears: SchoolYear[] = []
    if (startYear) {
        if (isString(startYear)) startYear = parseInt(startYear)

        for (let i = 0; i <= numYears; i++) {
            const currentYear = startYear + i
            const nextYear = currentYear + 1
            schoolYears.push({
                label: `${currentYear}-${nextYear}学年`,
                value: `${currentYear}`
            })
        }
    }

    return schoolYears
}

export function getCurrentAndFutureSchoolYears(schoolYears: SchoolYear[]) {
    const currentYear = new Date().getFullYear().toString()
    const currentSchoolYear = schoolYears.find((year) =>
        year.value.startsWith(currentYear)
    )

    if (!currentSchoolYear) {
        return [[], []] // 当前年份未找到，返回空数组
    }

    const currentIndex = schoolYears.findIndex(
        (year) => year.value === currentSchoolYear.value
    )
    const futureSchoolYears = schoolYears
        .slice(currentIndex + 1)
        .map((year) => year.value)

    return [[currentSchoolYear.value], futureSchoolYears]
}

export function getMessageDateTime(now: Date, date: Date) {
    if (isSameDay(date, new Date(0))) {
        return null
    }
    
    if (isSameDay(now, date)) {
        return format(date, "HH:mm")
    } else if (isSameYear(now, date)) {
        return format(date, "MM/dd")
    } else {
        return format(date, "yyyy/MM/dd")
    }
}
