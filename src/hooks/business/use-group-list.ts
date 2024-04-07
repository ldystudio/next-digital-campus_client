import { useEffect, useState } from "react"

import useSWR from "swr"

import { request } from "~/service/request"

export type UseUserListProps = {
    groupFetchUrl: string
}

const fetcher = (url: string) =>
    request.get<ApiPage.Query<any>>(url).then((res) => res.data)

export function useGroupList({ groupFetchUrl }: UseUserListProps) {
    const [items, setItems] = useState<any[]>([])
    const [page, setPage] = useState(1)

    const { data, error, isValidating } = useSWR(
        `${groupFetchUrl}?page=${page}&size=20`,
        fetcher
    )

    useEffect(() => {
        if (data) setItems((prevData) => [...prevData, ...(data.results || [])])
    }, [data])

    const hasMore = data?.next !== null
    const isLoading: boolean = !data && !error

    const onLoadMore = () => {
        if (hasMore) {
            setPage(page + 1)
        }
    }

    return {
        items,
        hasMore,
        isLoading: isValidating || isLoading,
        onLoadMore
    }
}