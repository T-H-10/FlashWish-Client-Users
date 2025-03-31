// import { GreetingCard } from "../../types/GreetingCardsTypes";

// export type CardActions = 
//    {
//     type: 'CREATE_CARD';
//     payload: { card: GreetingCard }
// } | {
//     type: 'UPDATE_CARD',
//     payload: Partial<GreetingCard>,
// } | {
//     type: 'DELETE_CARD'
// } | {
//     type: 'GET_CARD'
// }

// export default (state: GreetingCard, action: CardActions): GreetingCard => {
//     switch (action.type) {
//         case 'CREATE_CARD':         
//             return { ...action.payload.card };
//         case 'UPDATE_CARD':
//             return { ...state, ...action.payload };
//         case 'GET_CARD':
//             return state;
//         default:
//             return state;
//     }    
// }

import { useReducer, useEffect } from "react";
import { addGreetingCard } from "../cardsStore/GreetingCardsApi";
// import { v4 as uuidv4 } from "uuid";

type GreetingCard = {
    cardID: number;
    userID:number;
    templateID:number;
    textID: number;
    categoryID:number;
    // createdAt: Date;
    // updatedAt: Date
};

type State = {
  activeCardId: number | null;
  cards: GreetingCard[];
};

type Action =
  | { type: "CREATE_NEW_CARD" }
  | { type: "SET_ACTIVE_CARD"; id: number }
  | { type: "UPDATE_CARD"; id: number; textID: number; templateID: number }
  | { type: "DELETE_CARD"; id: number };

const initialState: State = {
  activeCardId: null,
  cards: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CREATE_NEW_CARD": {
        addGreetingCard({
            userID: 
        })
      const newCard: Partial<GreetingCard> = {
        // id: uuidv4(),
        textID: 0,
      };
      return {
        ...state,
        activeCardId: newCard.id,
        cards: [...state.cards, newCard],
      };
    }
    case "SET_ACTIVE_CARD":
      return { ...state, activeCardId: action.id };

    case "UPDATE_CARD":
      return {
        ...state,
        cards: state.cards.map((card) =>
          card.id === action.id
            ? { ...card, title: action.title, content: action.content }
            : card
        ),
      };

    case "DELETE_CARD":
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.id),
        activeCardId:
          state.activeCardId === action.id ? null : state.activeCardId,
      };

    default:
      return state;
  }
};

export const useCards = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.activeCardId && state.cards.length === 0) {
      dispatch({ type: "CREATE_NEW_CARD" });
    }
  }, [state.activeCardId, state.cards]);

  return { state, dispatch };
};
