import { create } from "zustand";

const initialState = {
	name: "",
	path: "",
	meta: {
		title: "",
		icon: "",
		order: 0
	}
};

export const useMenuItemStore = create<typeof initialState>()(() => initialState);

export function setMenuItem(item: typeof initialState) {
	useMenuItemStore.setState(() => ({
		...item
	}));
}

export function resetMenuItem() {
	useMenuItemStore.setState(() => ({
		...initialState
	}));
}
