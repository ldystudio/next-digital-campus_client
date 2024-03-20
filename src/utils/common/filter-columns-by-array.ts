import _filter from "lodash/filter"

export default function filterColumnsByArray(columns: Columns, array: string[]) {
    return _filter(columns, (column) => array.includes(column.uid))
}
