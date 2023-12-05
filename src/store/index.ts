import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./modules/auth";
import counterReducer from "./modules/counter";
import menuItemReducer from "./modules/menu";
import progressReducer from "./modules/progress";
import routeReducer from "./modules/route";

const store = configureStore({
	reducer: {
		counter: counterReducer,
		progress: progressReducer,
		menu: menuItemReducer,
		route: routeReducer,
		auth: authReducer
	}
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
