import { eachDayOfInterval, endOfWeek, format, isToday, startOfWeek } from "date-fns"

export default function getFormattedWeekDates() {
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
