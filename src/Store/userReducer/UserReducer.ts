import { initialUserState, UserType } from "../../types/UserTypes"

export type Action = {
    type: 'REGISTER_USER',
    payload: { user: UserType; token: string }
} | {
    type: 'LOGIN_USER';
    payload: { user: UserType; token: string }
} | {
    type: 'UPDATE_USER',
    payload: Partial<UserType>,
} | {
    type: 'DELETE_USER'
} | {
    type: 'GET_USER'
} | {
    type: 'LOGOUT_USER'
}

export default (state: UserType, action: Action): UserType => {
    switch (action.type) {
        case 'REGISTER_USER':         
            return { ...state, ...action.payload.user };
        case 'LOGIN_USER':
            return { ...state, ...action.payload.user };
        case 'LOGOUT_USER':
            return initialUserState;
        case 'UPDATE_USER':
            return { ...state, ...action.payload };
        case 'GET_USER':
            return state;
        default:
            return state;
    }    
}