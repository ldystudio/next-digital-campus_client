import _filter from "lodash/filter"

export function calculateYearDifference(givenDateStr: string): number | null {
    if (!givenDateStr) {
        return null
    }

    // 将字符串转换为Date对象
    const givenDate: Date = new Date(givenDateStr)
    // 今天的日期
    const today: Date = new Date()
    // 计算年份差异
    let yearDifference: number = today.getFullYear() - givenDate.getFullYear()

    // 如果今天的月份和日期在给定日期之前，则年份差异需要减去1
    if (
        today.getMonth() + 1 < givenDate.getMonth() + 1 ||
        (today.getMonth() + 1 === givenDate.getMonth() + 1 &&
            today.getDate() < givenDate.getDate())
    ) {
        yearDifference -= 1
    }

    return yearDifference
}

export function filterColumnsByArray(columns: Columns, array: string[]) {
    return _filter(columns, (column) => array.includes(column.uid))
}

export function convertToDetail(input: Columns, groupField?: string) {
    const output: { [key: string]: undefined | [] } = {}
    for (const item of input) {
        if (groupField && groupField === item.uid) {
            output[item.uid] = []
        } else if (item.uid === "classes") {
            output[item.uid] = []
        } else {
            output[item.uid] = undefined
        }
    }
    return output
}
