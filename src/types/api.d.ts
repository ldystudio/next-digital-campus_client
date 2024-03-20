// 后端接口返回的数据类型

/** 后端返回的用户权益相关类型 */
declare namespace ApiAuth {
    /** 返回的token和刷新token */
    interface Token {
        accessToken: string
        refreshToken: string
    }
    /** 返回的用户信息 */
    type UserInfo = Auth.UserInfo
}

declare namespace ApiUserManagement {
    interface User {
        /** 用户id */
        id: string
        /** 用户名 */
        username: string
        /** 真实姓名 */
        real_name: string | null
        /** 邮箱 */
        email: string
        /** 用户手机号码 */
        phone: string | null
        /**
         * 用户状态
         * - 1: 启用
         * - 2: 禁用
         * - 3: 冻结
         * - 4: 软删除
         */
        status: 1 | 2 | 3 | 4
        /** 用户头像 */
        avatar: string | null
        /** 个性签名 */
        signature: string | null
        /**
         * 用户性别
         * - 0: 女
         * - 1: 男
         */
        gender: 0 | 1
        /** 用户年龄 */
        age: number | null
        /** 住址 */
        address: string | null
    }
}

/** 后端返回的用户权益相关类型 */
declare namespace ApiPage {
    /** 返回的用户信息 */
    interface Detail {
        id: number
        user_id: number
        class_name: string
        date_of_admission: string
        service_date: string
        guardian_name: string
        guardian_phone: string
        enrollment_status: 1 | 2 | 3
        service_status: 1 | 2 | 3
        identification_number: string
        birth_date: number
        address: string
        gender: 1 | 2
        real_name: string
        email: string
        avatar: string
    }

    /** 返回的token和刷新token */
    interface Query {
        count: number
        next: string | null
        previous: string | null
        results: Detail[]
    }
}
