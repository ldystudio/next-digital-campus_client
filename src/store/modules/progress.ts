import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { useAppSelector, useAppDispatch } from "~/hooks/common";

type colorParameter = "primary" | "success" | "warning" | "danger";

const initialState = {
	isShow: false,
	color: "primary" as colorParameter,
	value: 0
};

const progressSlice = createSlice({
	name: "progress",
	initialState,
	reducers: {
		setValue(state, action: PayloadAction<number>) {
			state.value = action.payload;
		},
		showProgress(state) {
			state.isShow = true;
			state.color = "primary";
			state.value = 0;
		},
		hideProgress(state) {
			state.isShow = false;
		},
		successProgress(state) {
			state.color = "success";
			state.value = 100;
		},
		errorProgress(state) {
			state.color = "danger";
			state.value = 100;
		}
	}
});

export default progressSlice.reducer;
export function useProgressState() {
	const isShow = useAppSelector((state) => state.progress.isShow);
	const color = useAppSelector((state) => state.progress.color);
	const value = useAppSelector((state) => state.progress.value);
	return { isShow, color, value };
}

export function useProgressAction() {
	const dispatch = useAppDispatch();

	function setValue(number: number) {
		dispatch(progressSlice.actions.setValue(number));
	}
	function showProgress() {
		dispatch(progressSlice.actions.showProgress());
	}
	function hideProgress() {
		dispatch(progressSlice.actions.hideProgress());
	}
	function successProgress() {
		dispatch(progressSlice.actions.successProgress());
		setTimeout(() => {
			hideProgress();
		}, 700);
	}
	function errorProgress() {
		dispatch(progressSlice.actions.errorProgress());
		setTimeout(() => {
			hideProgress();
		}, 700);
	}

	return {
		setValue,
		showProgress,
		hideProgress,
		successProgress,
		errorProgress
	};
}
