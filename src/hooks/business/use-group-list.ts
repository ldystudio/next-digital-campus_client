import { useEffect, useState } from "react"

import _uniqBy from "lodash/uniqBy"
import { useQuery } from "@tanstack/react-query"

export type UseUserListProps = {
    groupFetchUrl: string
}

export function useGroupList({ groupFetchUrl }: UseUserListProps) {
    const [items, setItems] = useState<any[]>([])
    const [page, setPage] = useState(1)
    const [url, setUrl] = useState(groupFetchUrl)

    useEffect(() => {
        if (url !== groupFetchUrl) {
            setUrl(groupFetchUrl)
            setPage(1)
        }
    }, [groupFetchUrl, url])

    const { data, error, isPending } = useQuery<ApiPage.Query<any>>({
        queryKey: [`${url}${url.includes("?") ? "&" : "?"}size=20&page=`, page],
        refetchOnWindowFocus: true
    })

    useEffect(() => {
        if (data)
            setItems((prevData) =>
                _uniqBy([...prevData, ...(data.results ?? [])], "id")
            )
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
        isLoading: isPending || isLoading,
        onLoadMore
    }
}
