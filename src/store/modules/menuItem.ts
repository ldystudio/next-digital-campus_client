import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { useAppDispatch, useAppSelector } from "~/hooks/common"

interface MenuItemState {
    parentMenuItem: App.AdminMenu
    activeMenuItem: App.AdminMenu
}

const initialState: MenuItemState = {
    parentMenuItem: {
        key: "",
        label: "",
        routeName: "",
        routePath: "",
        icon: "",
        children: undefined
    },
    activeMenuItem: {
        key: "",
        label: "",
        routeName: "",
        routePath: "",
        icon: ""
    }
}

const menuItemSlice = createSlice({
    name: "menuItem",
    initialState,
    reducers: {
        setParentMenuItem(state, action: PayloadAction<App.AdminMenu>) {
            return { ...state, parentMenuItem: action.payload }
        },
        setActiveMenuItem(state, action: PayloadAction<App.AdminMenu>) {
            return { ...state, activeMenuItem: action.payload }
        },
        resetMenuItem() {
            return initialState
        }
    }
})

export default menuItemSlice.reducer
export function useMenuItemState() {
    return useAppSelector((state) => state.menuItem)
}

export function useMenuItemAction() {
    const dispatch = useAppDispatch()

    function setParentMenuItem(parentMenuItem: App.AdminMenu) {
        dispatch(menuItemSlice.actions.setParentMenuItem(parentMenuItem))
    }
    function setActiveMenuItem(activeMenuItem: App.AdminMenu) {
        dispatch(menuItemSlice.actions.setActiveMenuItem(activeMenuItem))
    }
    function resetMenuItem() {
        dispatch(menuItemSlice.actions.resetMenuItem())
    }

    return {
        setParentMenuItem,
        setActiveMenuItem,
        resetMenuItem
    }
}
