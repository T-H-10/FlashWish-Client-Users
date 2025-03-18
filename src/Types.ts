import { Action } from "@reduxjs/toolkit";
import { Dispatch } from "react";

export type UserType = {
    id: number;
    name: string;
    email: string;
    password: string; 
    createdAt: Date;
    updatedAt: Date;
    // roles?: Role[]; 
    // greetingCards?: GreetingCard[];
}
export type GreetingCard = {
    id: number;
    message: string; 
    createdAt: Date;
    userId: number;
}
export type Role = {
    id: number;
    name: string;
}
export const initialUserState: UserType = {
    id: 0,
    name: '', 
    email: '', 
    password: '', 
    createdAt: new Date(), 
    updatedAt: new Date(), 
    // roles: [],
    // greetingCards: [] 
};

export type UserContextType={
    user: UserType | null;
    userDispatch: Dispatch<Action>;
};