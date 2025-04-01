import { createContext, Dispatch } from "react";
import { GreetingCard, GreetingCardPostModel, initialGreetingCardState } from "../../types/GreetingCardsTypes";

type Action =
    | { type: "CREATE_NEW_CARD"
        // , data: GreetingCardPostModel 
    }
    | { type: "UPDATE_CARD", data: Partial<GreetingCardPostModel> }
    | { type: "DELETE_CARD", id: number };

const initialState: GreetingCard = initialGreetingCardState;

const cardReducer = (state = initialState, action: Action): GreetingCard => {
    // console.log(action.type);
    // console.log(state);
    
    switch (action.type) {
        case "CREATE_NEW_CARD":
            return {...state}
            // return { ...state, ...action.data }; // הוספת הכרטיס החדש ל-state
        case "UPDATE_CARD":
            {
                // console.log({...state, ...action.data});
                return { ...state, ...action.data };
            }
        case "DELETE_CARD": 
            return initialGreetingCardState; 
        default:
            return state;
    }
};

export default cardReducer;

export const CurrentCardContext = createContext<{ currentCard: GreetingCard, cardDispatch: Dispatch<Action> }>({
    currentCard: initialGreetingCardState,
    cardDispatch: () => null
});