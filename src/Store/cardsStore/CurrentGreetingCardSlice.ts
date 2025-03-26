import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GreetingCard, initialGreetingCardState } from "../../types/GreetingCardsTypes";
import { storeType } from "../Store";

const CurrentGreetingCardSlice = createSlice({
    name: 'currentGreetingCard',
    initialState: { selectedGreetingCard: initialGreetingCardState },
    reducers: {
        selectGreetingCard: (state, action: PayloadAction<GreetingCard>) => {
            state.selectedGreetingCard = action.payload;
        },
        clearSelectedGreetingCard: (state) => {
            state.selectedGreetingCard = initialGreetingCardState;
        }
    }
});

export const { selectGreetingCard, clearSelectedGreetingCard } = CurrentGreetingCardSlice.actions;
export const selectCurrentGreetingCard = (state: storeType) => state.currentGreetingCard.selectedGreetingCard;
export default CurrentGreetingCardSlice;
