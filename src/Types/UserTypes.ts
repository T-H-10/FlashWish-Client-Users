// import { Action } from "@reduxjs/toolkit";
import { createContext, Dispatch } from "react";
import { Action } from "../Store/userReducer/UserReducer";

export const API_URL= import.meta.env.VITE_API_URL + '/api';

export type UserType = {
    id: number;
    userName: string;
    email: string;
    password: string; 
    // createdAt: Date;
    // updatedAt: Date;
    // roles?: Role[]; 
    // greetingCards?: GreetingCard[];
}
// export type UserWithTokenType = {
//     user: UserType;
//     token: string;
// }

export const initialUserState: UserType = {
    id: 0,
    userName: '', 
    email: '', 
    password: '', 
    // createdAt: new Date(), 
    // updatedAt: new Date(), 
    // roles: [],
    // greetingCards: [] 
};

export type UserContextType={
    user: UserType | null;
    userDispatch: Dispatch<Action>;
};

export const UserContext = createContext<{ user: UserType, userDispatch: Dispatch<Action> }>({
    user: initialUserState,
    userDispatch: () => null
});