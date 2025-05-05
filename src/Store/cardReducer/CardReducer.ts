import { createContext, Dispatch } from "react";
import { GreetingCard, initialGreetingCardState } from "../../types/GreetingCardsTypes";

// פעולה שמייצגת שינויים בכרטיס
export type CardAction =
    | { type: "CREATE_NEW_CARD" }
    | { type: "UPDATE_CARD", data: Partial<GreetingCard> }
    | { type: "DELETE_CARD", id: number }
    | { type: "SET_TEMPLATE", payload: { templateID: number } }

// מצב התחלתי
const initialState: GreetingCard = initialGreetingCardState;

// רידוסר
const cardReducer = (state = initialState, action: CardAction): GreetingCard => {
    switch (action.type) {
        case "CREATE_NEW_CARD":
            return { ...initialGreetingCardState }; // או עם action.data
        case "UPDATE_CARD":
            return { ...state, ...action.data };
        case "SET_TEMPLATE":
            return { ...state, templateID: action.payload.templateID };
        case "DELETE_CARD":
            return initialGreetingCardState;
        default:
            return state;
    }
};

export default cardReducer;

// טיפוס context
export interface CurrentCardContextType {
    currentCard: GreetingCard;
    cardDispatch: Dispatch<CardAction>;
}

export const CurrentCardContext = createContext<CurrentCardContextType>({
    currentCard: initialGreetingCardState,
    cardDispatch: () => { },
});
