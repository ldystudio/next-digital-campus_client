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
			return { ...state, value: action.payload };
		},
		showProgress(state) {
			return { isShow: true, color: "primary", value: 0 };
		},
		hideProgress(state) {
			return { ...state, isShow: false };
		},
		successProgress(state) {
			return { ...state, color: "success", value: 100 };
		},
		errorProgress(state) {
			return { ...state, color: "danger", value: 100 };
		}
	}
});

export default progressSlice.reducer;

export function useProgressState() {
	return useAppSelector((state) => state.progress);
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
