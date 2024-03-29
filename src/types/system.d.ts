declare interface LayoutProps {
    children: React.ReactNode
}

declare interface PageComponentProps {
    className?: string
}

declare type Columns = {
    uid: string
    name: string
    sortable?: boolean
    isRequired?: boolean
}[]

/** 请求的相关类型 */
declare namespace Service {
    /**
     * 请求的错误类型：
     * - axios: axios错误：网络错误, 请求超时, 默认的兜底错误
     * - http: 请求成功，响应的http状态码非200的错误
     * - backend: 请求成功，响应的http状态码为200，由后端定义的业务错误
     */
    type RequestErrorType = "axios" | "http" | "backend"

    /** 请求错误 */
    interface RequestError {
        /** 请求服务的错误类型 */
        type: RequestErrorType
        /** 错误码 */
        code: string | number
        /** 错误信息 */
        msg: string
    }

    /** 后端接口返回的数据结构配置 */
    interface BackendResultConfig {
        /** 表示后端请求状态码的属性字段 */
        codeKey: string
        /** 表示后端请求数据的属性字段 */
        dataKey: string
        /** 表示后端消息的属性字段 */
        msgKey: string
        /** 后端业务上定义的成功请求的状态 */
        successCode: (string | number)[]
    }

    /** 自定义的请求成功结果 */
    interface SuccessResult<T = any> {
        /** 请求错误 */
        error: null
        /** 请求数据 */
        data: T
    }

    /** 自定义的请求失败结果 */
    interface FailedResult {
        /** 请求错误 */
        error: RequestError
        /** 请求数据 */
        data: null
    }

    /** 自定义的请求结果 */
    type RequestResult<T = any> = SuccessResult<T> | FailedResult

    /** 多个请求数据结果 */
    type MultiRequestResult<T extends any[]> = T extends [infer First, ...infer Rest]
        ? [First] extends [any]
            ? Rest extends any[]
                ? [Service.RequestResult<First>, ...MultiRequestResult<Rest>]
                : [Service.RequestResult<First>]
            : Rest extends any[]
              ? MultiRequestResult<Rest>
              : []
        : []

    /** 请求结果的适配器函数 */
    type ServiceAdapter<T = any, A extends any[] = any> = (...args: A) => T
}

declare namespace I18nType {
    type langType = "en" | "zh-CN" | "km-KH"

    interface Schema {
        system: {
            title: string
        }
        routes: {
            dashboard: {
                _value: string
                analysis: string
                workbench: string
            }
            document: {
                _value: string
                vue: string
                vite: string
                naive: string
                project: string
                "project-link": string
            }
            component: {
                _value: string
                button: string
                card: string
                table: string
            }
            plugin: {
                _value: string
                charts: {
                    _value: string
                    antv: string
                    echarts: string
                }
                copy: string
                editor: {
                    _value: string
                    markdown: string
                    quill: string
                }
                icon: string
                map: string
                print: string
                swiper: string
                video: string
            }
            "auth-demo": {
                _value: string
                permission: string
                super: string
            }
            function: {
                _value: string
                tab: string
            }
            exception: {
                _value: string
                403: string
                404: string
                500: string
            }
            "multi-menu": {
                _value: string
                first: {
                    _value: string
                    second: string
                    "second-new": {
                        _value: string
                        third: string
                    }
                }
            }
            management: {
                _value: string
                auth: string
                role: string
                route: string
                user: string
            }
            about: string
        }
    }
}

declare namespace App {
    /** 菜单项配置 */
    type AdminMenu = {
        key: string
        label: string
        routeName: string
        routePath: string
        icon?: string
        children?: AdminMenu[]
        i18nTitle?: string
    }
}
