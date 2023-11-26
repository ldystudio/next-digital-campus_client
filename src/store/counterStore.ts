import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface CounterState {
	count: number;
	increment: () => void;
	decrement: () => void;
	summary: () => string;
}

export const useCounterStore = create<CounterState>()(
	immer((set, get) => ({
		count: 0,
		increment: () => set((state) => ({ count: state.count + 1 })),
		decrement: () => set((state) => ({ count: state.count - 1 })),
		summary: () => {
			const total = get().count;
			return `Total: ${total}`;
		}
	}))
);
