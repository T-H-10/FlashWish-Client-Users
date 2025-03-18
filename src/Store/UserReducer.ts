import { initialUserState, UserType, UserWithTokenType } from "../Types"

export type Action = {
    type: 'REGISTER_USER',
    payload: UserWithTokenType
} | {
    type: 'LOGIN_USER',
    payload: UserWithTokenType
} | {
    type: 'UPDATE_USER',
    payload: Partial<UserType>,
} | {
    type: 'DELETE_USER'
} | {
    type: 'GET_USER' | 'LOGOUT_USER'
}

export default (state: UserType, action: Action): UserType => {
    switch (action.type) {
        case 'REGISTER_USER':
            return { ...state, ...action.payload };
        case 'LOGIN_USER':
            return { ...state, ...action.payload };
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