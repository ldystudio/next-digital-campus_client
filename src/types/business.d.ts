/** 用户相关模块 */
declare namespace Auth {
	/**
	 * 用户角色类型(前端静态路由用角色类型进行路由权限的控制)
	 * - super: 超级管理员(该权限具有所有路由数据)
	 * - admin: 管理员
	 * - user: 用户
	 */
	type RoleType = "admin" | "teacher" | "student";

	/** 用户信息 */
	interface UserInfo {
		/** 用户id */
		userId: string;
		/** 用户名 */
		userName: string;
		/** 用户角色类型 */
		userRole: RoleType;
		/** 用户头像 */
		avatar?: string;
		/** 真实姓名 */
		realName?: string;
		/** 邮箱 */
		email?: string;
	}

	interface LoginForm {
		/** 用户名 */
		username: string;
		/** 密码 */
		password: string;
		/** 验证码 */
		captcha: string;
		/** 验证码的唯一标识 */
		traceId: string;
	}

	interface RegisterForm {
		/** 用户名 */
		username: string;
		/** 密码 */
		password: string;
		/** 验证码 */
		captcha: string;
		/** 验证码的唯一标识 */
		traceId: string;
		/** 邮箱 */
		email: string;
	}
}

declare namespace UserManagement {
	interface User extends ApiUserManagement.User {
		/** 序号 */
		index: number;
		/** 表格的key（id） */
		key: string;
	}

	/**
	 * 用户性别
	 * - 0: 女
	 * - 1: 男
	 */
	type GenderKey = NonNullable<User["gender"]>;

	/**
	 * 用户状态
	 * - 1: 启用
	 * - 2: 禁用
	 * - 3: 冻结
	 * - 4: 软删除
	 */
	type UserStatusKey = NonNullable<User["userStatus"]>;
}
