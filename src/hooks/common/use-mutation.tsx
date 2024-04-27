import toast from "react-hot-toast"
import {
    UseMutationOptions,
    useMutation as useReactQueryMutation
} from "@tanstack/react-query"

import { ERROR_MSG_DURATION } from "~/config"
import { request } from "~/service/request"

interface UseMutationProps extends UseMutationOptions {
    url?: string
    method?: "post" | "put" | "patch" | "delete"
    data?: any
    successMsg?: string
    errorMsg?: string
    headMsg?: string
    onSettledAfter?: () => void
    onSuccessAfter?: () => void
    onErrorAfter?: () => void
}

export function useMutation(options: UseMutationProps) {
    const mutationFn = options.url
        ? request[options.method ?? "post"].bind(request, options.url, options.data)
        : undefined

    return useReactQueryMutation({
        mutationFn,
        mutationKey: [options.url, ...(options.data ? [options.data] : [])],
        onMutate: () => {
            if (!options.url && !mutationFn) {
                console.error("Mutation function is required when url is not provided")
            }
        },
        onSuccess: (requestResult) => {
            const data = (requestResult as Service.RequestResult)?.data
            if (data) {
                toast.success(options.successMsg ?? `${options.headMsg ?? "操作"}成功`)
                options.onSuccessAfter?.()
            }
        },
        onError: (error) => {
            toast.error(
                `${options.errorMsg ?? `${options.headMsg ?? "操作"}失败`}，原因：${
                    error.message
                }`,
                { duration: ERROR_MSG_DURATION }
            )
            options.onErrorAfter?.()
        },
        onSettled: (requestResult) => {
            const error = (requestResult as Service.RequestResult)?.error
            if (error) throw new Error(error.msg)
            options.onSettledAfter?.()
        },
        ...options
    })
}
