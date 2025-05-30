import { createContext, Dispatch } from "react";
import { Action } from "../Store/userReducer/UserReducer";

export const API_URL= import.meta.env.VITE_API_URL + 'api';

export type UserType = {
    id?: number;
    userName: string;
    email: string;
    password: string; 
}

export const initialUserState: UserType = {
    // id: ,
    userName: '', 
    email: '', 
    password: '', 
};

export type UserContextType={
    user: UserType | null;
    userDispatch: Dispatch<Action>;
};

export const UserContext = createContext<{ user: UserType, userDispatch: Dispatch<Action> }>({
    user: initialUserState,
    userDispatch: () => null
});