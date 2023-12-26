import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./modules/auth"
import menuItemReducer from "./modules/menuItem"
import routeReducer from "./modules/route"

const store = configureStore({
    reducer: {
        menuItem: menuItemReducer,
        route: routeReducer,
        auth: authReducer
    },
    devTools: process.env.NODE_ENV !== "production"
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// 确保在store初始化后才能获取到state
export function getRouteState() {
    return store.getState().route
}

export function getAuthState() {
    return store.getState().auth
}
export function getMenuItemState() {
    return store.getState().menuItem
}
