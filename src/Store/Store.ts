import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { createContext , Dispatch} from "react";
import { UserType, initialUserState } from "../Types";
import { Action } from "./UserReducer";

const Store = configureStore({
    reducer: combineSlices(
        // recipesSlice,
    ),
});

export type storeType = ReturnType<typeof Store.getState>
export type appDispatch = typeof Store.dispatch;
export default Store;


export const UserContext = createContext<{ user: UserType, userDispatch: Dispatch<Action> }>({
    user: initialUserState,
    userDispatch: () => null
});