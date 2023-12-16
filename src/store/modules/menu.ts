import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { useAppSelector, useAppDispatch } from "~/hooks/common"

const initialState: App.AdminMenu = {
    key: "",
    label: "",
    routeName: "",
    routePath: "",
    icon: ""
}

const menuItemSlice = createSlice({
    name: "menuItem",
    initialState,
    reducers: {
        setMenuItem(state, action: PayloadAction<App.AdminMenu>) {
            return action.payload
        },
        resetMenuItem() {
            return initialState
        }
    }
})

export default menuItemSlice.reducer
export function useMenuItemState() {
    return useAppSelector((state) => state.menu)
}

export function useMenuItemAction() {
    const dispatch = useAppDispatch()

    function setMenuItem(menuItem: App.AdminMenu) {
        dispatch(menuItemSlice.actions.setMenuItem(menuItem))
    }
    function resetMenuItem() {
        dispatch(menuItemSlice.actions.resetMenuItem())
    }

    return {
        setMenuItem,
        resetMenuItem
    }
}
