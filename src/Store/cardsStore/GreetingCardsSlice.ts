import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import { storeType } from "../Store";
import { GreetingMessageDTO } from "../../types/GreetingCardsTypes";
import { addGreetingCard, deleteGreetingCard, fetchGreetingCards, updateGreetingCard } from "./GreetingCardsApi";

const GreetingCardsSlice = createSlice({
    name: 'greetingCards',
    initialState: { greetingCardsList: [] as GreetingMessageDTO[], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGreetingCards.fulfilled, (state, action) => {
                state.greetingCardsList = action.payload;
                state.loading = false;                
            })
            .addCase(fetchGreetingCards.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchGreetingCards.rejected, (state, action) => {
                state.loading = false;
                handleApiError(action.error);
            })
            .addCase(addGreetingCard.fulfilled, (state, action: PayloadAction<GreetingMessageDTO>) => {
                state.greetingCardsList = [...state.greetingCardsList, {...action.payload}];
                state.loading = false;
            })
            .addCase(addGreetingCard.pending, (state) => {
                state.loading = true;
            })
            .addCase(addGreetingCard.rejected, (state, action) => {
                state.loading = false;
                handleApiError(action.error);
            })
            .addCase(updateGreetingCard.fulfilled, (state, action: PayloadAction<GreetingMessageDTO>) => {
                
                console.log(action.payload);
                
                const index = state.greetingCardsList.findIndex((card) => card.TextID === action.payload.TextID);
                if (index >= 0) {
                    state.greetingCardsList[index] = action.payload;
                }
                state.loading = false;
                console.log(state.greetingCardsList);

            })
            .addCase(updateGreetingCard.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateGreetingCard.rejected, (state, action) => {
                state.loading = false;
                handleApiError(action.error);
            })
            .addCase(deleteGreetingCard.fulfilled, (state, action: PayloadAction<number>) => {
                state.greetingCardsList = state.greetingCardsList.filter((card) => card.TextID !== action.payload);
                state.loading = false;
            })
            .addCase(deleteGreetingCard.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteGreetingCard.rejected, (state, action) => {
                state.loading = false;
                handleApiError(action.error);
            });
    }
});

const handleApiError = (error: any) => {
    let errorMessage = 'נסה מאוחר יותר.';
    
    if (error.message.includes('401')) {
        errorMessage = 'שגיאת אימות. אנא התחבר מחדש.';
    } else if (error.message.includes('400')) {
        errorMessage = 'נתונים חסרים או לא תקינים.';
    } else if (error.message.includes('500')) {
        errorMessage = 'שגיאה בשרת. נסו שוב מאוחר יותר.';
    }

    Swal.fire({
        icon: 'error',
        title: 'תקלה!',
        text: errorMessage,
    });
};

export const selectGreetingCards = (state: storeType) => state.greetingCards;
export default GreetingCardsSlice;
