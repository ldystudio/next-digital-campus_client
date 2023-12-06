import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { useAppSelector, useAppDispatch } from "~/hooks/common";

const initialState = {
	name: "",
	path: "",
	meta: {
		title: "",
		icon: "",
		order: 0
	}
};

const menuItemSlice = createSlice({
	name: "menuItem",
	initialState,
	reducers: {
		setMenuItem(state, action: PayloadAction<typeof initialState>) {
			return action.payload;
		},
		resetMenuItem() {
			return initialState;
		}
	}
});

export default menuItemSlice.reducer;
export function useMenuItemState() {
	const menuItem = useAppSelector((state) => state.menu);
	return { menuItem };
}

export function useMenuItemAction() {
	const dispatch = useAppDispatch();

	function setMenuItem(menuItem: typeof initialState) {
		dispatch(menuItemSlice.actions.setMenuItem(menuItem));
	}
	function resetMenuItem() {
		dispatch(menuItemSlice.actions.resetMenuItem());
	}

	return {
		setMenuItem,
		resetMenuItem
	};
}
