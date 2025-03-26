import { createContext, Dispatch, useContext } from "react";
import { GreetingCard, initialGreetingCardState } from "../../types/GreetingCardsTypes";
import { Action } from "@reduxjs/toolkit";

export const CardContext = createContext<{card: GreetingCard, cardDispatch: Dispatch<Action> }>({
    card: initialGreetingCardState,
    cardDispatch: () => null
});

export const useCard = () => {
    const context = useContext(CardContext);
    if (!context) {
        throw new Error('useCard must be used within a CardProvider');
    }
    return context;
};