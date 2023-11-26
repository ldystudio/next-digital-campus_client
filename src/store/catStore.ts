import { create } from "zustand";
import { createJSONStorage, devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const storeName = "Cats Store";
const initialState = {
	cats: {
		bigCats: 0,
		smallCats: 0
	},
	color: "red",
	size: "big"
};

export const useCatsStore = create<typeof initialState>()(
	// immer: 修改时无需再...cats了
	immer(
		// 浏览器安装Redux Devtools可查看状态
		devtools(
			// 订阅状态
			subscribeWithSelector(
				// 保存状态
				persist(() => initialState, {
					name: storeName,
					// * 保存位置
					storage: createJSONStorage(() => localStorage)
					// * 保存时只保存某些State
					// partialize: (state) => ({ bigCats: state.cats.bigCats })
					// * 保存时排除某些State
					// partialize: (state) =>
					// 	Object.fromEntries(
					// 		Object.entries(state).filter(
					// 			([key]) => !["color", "size"].includes(key)
					// 		)
					// 	)
				})
			),
			{ name: storeName, enabled: true }
		)
	)
);

/**
 * * 对象state的单个属性:
 * const bigCats = useAsyncStore(useCatsStore, (state) => state.cats.bigCats);
 */
export function incrementBigCats() {
	useCatsStore.setState((state) => {
		state.cats.bigCats++;
	});
}
export function incrementSmallCats() {
	useCatsStore.setState((state) => {
		state.cats.smallCats++;
	});
}
export function reset() {
	useCatsStore.setState(() => ({
		...initialState
	}));
}
