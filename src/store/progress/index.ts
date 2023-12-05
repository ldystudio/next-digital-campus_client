import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type colorParameter = "primary" | "success" | "warning" | "danger";

const initialState = {
	isShow: false,
	color: "primary" as colorParameter,
	value: 0
};

export const useProgressStore = create<typeof initialState>()(immer(() => initialState));

export function setValueHandler(value: number) {
	useProgressStore.setState((state) => {
		state.value = value;
	});
}

export function showProgress() {
	useProgressStore.setState(() => ({
		isShow: true,
		color: "primary",
		value: 0
	}));
}

export function hideProgress() {
	setTimeout(() => {
		useProgressStore.setState((state) => {
			state.isShow = false;
		});
	}, 700);
}

export function successProgress() {
	useProgressStore.setState((state) => {
		(state.color = "success"), (state.value = 100);
	});
	hideProgress();
}

export function errorProgress() {
	useProgressStore.setState((state) => {
		(state.color = "danger"), (state.value = 100);
	});
	hideProgress();
}
