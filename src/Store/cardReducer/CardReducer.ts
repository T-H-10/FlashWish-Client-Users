import { createContext, Dispatch } from "react";
import { GreetingCard, GreetingCardPostModel, initialGreetingCardState } from "../../types-change/GreetingCardsTypes";

// פעולה שמייצגת שינויים בכרטיס
export type CardAction =
    | { type: "CREATE_NEW_CARD" }
    | { type: "UPDATE_CARD", data: Partial<GreetingCardPostModel> }
    | { type: "DELETE_CARD", id: number };

// מצב התחלתי
const initialState: GreetingCard = initialGreetingCardState;

// רידוסר
const cardReducer = (state = initialState, action: CardAction): GreetingCard => {
    switch (action.type) {
        case "CREATE_NEW_CARD":
            return { ...initialGreetingCardState }; // או עם action.data
        case "UPDATE_CARD":
            return { ...state, ...action.data };
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
    cardDispatch: () => {},
});


// import { createContext, Dispatch } from "react";
// import { GreetingCard, GreetingCardPostModel, initialGreetingCardState } from "../../types/GreetingCardsTypes";

// type Action =
//     | { type: "CREATE_NEW_CARD"
//         // , data: GreetingCardPostModel 
//     }
//     | { type: "UPDATE_CARD", data: Partial<GreetingCardPostModel> }
//     | { type: "DELETE_CARD", id: number };

// const initialState: GreetingCard = initialGreetingCardState;

// const cardReducer = (state = initialState, action: Action): GreetingCard => {
//     // console.log(action.type);
//     // console.log(state);
    
//     switch (action.type) {
//         case "CREATE_NEW_CARD":
//             return {...state}
//             // return { ...state, ...action.data }; // הוספת הכרטיס החדש ל-state
//         case "UPDATE_CARD":
//             {
//                 // console.log({...state, ...action.data});
//                 return { ...state, ...action.data };
//             }
//         case "DELETE_CARD": 
//             return initialGreetingCardState; 
//         default:
//             return state;
//     }
// };

// export default cardReducer;

// export const CurrentCardContext = createContext<{ currentCard: GreetingCard, cardDispatch: Dispatch<Action> }>({
//     currentCard: initialGreetingCardState,
//     cardDispatch: () => null
// });