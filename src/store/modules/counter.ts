import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { useAppSelector, useAppDispatch } from "~/hooks/common";

interface CounterState {
	count: number;
}

const initialState: CounterState = {
	count: 0
};

const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		increment(state) {
			state.count += 1;
		},
		decrement(state) {
			state.count -= 1;
		},
		incrementByAmount(state, action: PayloadAction<number>) {
			state.count += action.payload;
		}
	}
});

export default counterSlice.reducer;

export function useCounterState() {
	const count = useAppSelector((state) => state.counter.count);
	return { count };
}

export function useCounterAction() {
	const dispatch = useAppDispatch();

	function increment() {
		return dispatch(counterSlice.actions.increment());
	}
	function decrement() {
		return dispatch(counterSlice.actions.decrement());
	}
	function incrementByAmount(number: number) {
		return dispatch(counterSlice.actions.incrementByAmount(number));
	}

	return {
		increment,
		decrement,
		incrementByAmount
	};
}
