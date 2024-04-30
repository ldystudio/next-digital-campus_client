import { ChangeEvent, useCallback, useMemo, useState } from "react"

import _differenceBy from "lodash/differenceBy"
import useSWR from "swr"
import { Selection, SortDescriptor } from "@nextui-org/react"

import { request } from "~/service/request"

interface useTableParamsProps {
    columns: Columns
    url: string
    selectedFilterKeys: Set<string>
    statusField?: string
    statusOptions?: Columns
    initialSortColumn?: string
    initialInvisibleColumns?: string[]
}

const getListFetcher = (url: string) =>
    request.get<ApiPage.Query>(url).then((res) => res.data)

export function useTableParams({
    columns,
    url,
    selectedFilterKeys,
    statusField,
    statusOptions,
    initialSortColumn = "id",
    initialInvisibleColumns = []
}: useTableParamsProps) {
    const [filterValue, setFilterValue] = useState("")
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
    const [visibleColumns, setVisibleColumns] = useState<Selection>(
        new Set(
            _differenceBy(
                columns.map((column) => column.uid),
                initialInvisibleColumns
            )
        )
    )
    const [statusFilter, setStatusFilter] = useState<Selection>("all")
    const [rowsPerPage, setRowsPerPage] = useState(8)
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: initialSortColumn,
        direction: "ascending"
    })

    const [details, setDetails] = useState<any>(null)
    const [modifiedDetails, setModifiedDetails] = useState<any>({})
    const [modelType, setModelType] = useState<"add" | "edit">("add")

    const [page, setPage] = useState(1)
    const finalUrl = `${url}?page=${page}&size=${rowsPerPage}&${Array.from(
        selectedFilterKeys
    ).join(", ")}=${filterValue}&ordering=${
        sortDescriptor.direction === "ascending" ? "" : "-"
    }${sortDescriptor.column}&${statusField}=${
        statusFilter === "all" ? "" : Array.from(statusFilter).join(",")
    }`
    const {
        data: pageData,
        isLoading,
        mutate: refetch
    } = useSWR(finalUrl, getListFetcher, { keepPreviousData: true })

    const pages = useMemo(() => {
        return pageData?.count ? Math.ceil(pageData.count / rowsPerPage) : 1
    }, [pageData?.count, rowsPerPage])

    const rows = pageData?.results ?? []

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns

        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid)
        )
    }, [columns, visibleColumns])

    const findStatusName = useCallback(
        (status: number) =>
            statusOptions
                ? statusOptions.find((option) => option.uid === `${status}`)?.name
                : "",
        [statusOptions]
    )

    function onNextPage() {
        if (page < pages) {
            setPage(page + 1)
        }
    }

    function onPreviousPage() {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    function onRowsPerPageChange(e: ChangeEvent<HTMLSelectElement>) {
        setRowsPerPage(Number(e.target.value))
        setPage(1)
    }

    function onSearchChange(value?: string) {
        if (value) {
            setFilterValue(value)
            setPage(1)
        } else {
            setFilterValue("")
        }
    }

    function onClear() {
        setFilterValue("")
        setPage(1)
    }

    function modifiedAttribute(key: string, value: any) {
        setModifiedDetails({
            ...modifiedDetails,
            [key]: value
        })
    }

    function getOneFn(id: string) {
        return request.get<ApiPage.Detail>(`${url}${id}/`)
    }

    function removeOneFn(id: string) {
        return request.delete<null>(`${url}${id}/`)
    }

    function updateOneFn({ id, ...otherData }: ApiPage.Detail) {
        return request.patch<ApiPage.Detail>(`${url}${id}/`, otherData)
    }

    function saveOneFn(data: any) {
        return request.post<ApiPage.Detail>(url, data)
    }

    return {
        filterValue,
        setFilterValue,
        selectedKeys,
        setSelectedKeys,
        visibleColumns,
        setVisibleColumns,
        statusFilter,
        setStatusFilter,
        rowsPerPage,
        setRowsPerPage,
        sortDescriptor,
        setSortDescriptor,
        details,
        setDetails,
        modifiedDetails,
        setModifiedDetails,
        modelType,
        setModelType,
        page,
        setPage,
        rows,
        pageData,
        headerColumns,
        pages,
        isLoading,
        findStatusName,
        refetch,
        onNextPage,
        onPreviousPage,
        onRowsPerPageChange,
        onSearchChange,
        onClear,
        modifiedAttribute,
        getOneFn,
        removeOneFn,
        updateOneFn,
        saveOneFn
    }
}
