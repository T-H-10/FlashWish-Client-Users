import { GreetingCard } from "../../types/GreetingCardsTypes";

export type CardActions = 
   {
    type: 'CREATE_CARD';
    payload: { card: GreetingCard }
} | {
    type: 'UPDATE_CARD',
    payload: Partial<GreetingCard>,
} | {
    type: 'DELETE_CARD'
} | {
    type: 'GET_CARD'
}

export default (state: GreetingCard, action: CardActions): GreetingCard => {
    switch (action.type) {
        case 'CREATE_CARD':         
            return { ...action.payload.card };
        case 'UPDATE_CARD':
            return { ...state, ...action.payload };
        case 'GET_CARD':
            return state;
        default:
            return state;
    }    
}

