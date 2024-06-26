declare namespace StorageInterface {
    /** localStorage的存储数据的类型 */
    interface Session {
        demoKey: string
    }

    /** localStorage的存储数据的类型 */
    interface Local {
        /** 用户token */
        token: string
        /** 用户刷新token */
        refreshToken: string
        /** 用户信息 */
        userInfo: Auth.UserInfo
        /** WebSocket请求ID */
        requestId: string
        /** 本地语言缓存 */
        lang: I18nType.langType
        /** 管理页菜单 */
        authMenus: App.AdminMenu[]
        /** 查询菜单 */
        searchMenus: AuthRoute.Route[]
    }
}
