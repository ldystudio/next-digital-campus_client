declare interface adminMenuItemsType {
	/**
	 * 导航栏
	 */
	name: string;
	path: string;
	meta: {
		title: string;
		permissions?: string[];
		icon: string;
		order: number;
	};
	children?: {
		name: string;
		path: string;
		meta: {
			title: string;
			icon: string;
			order: number;
		};
	};
}
