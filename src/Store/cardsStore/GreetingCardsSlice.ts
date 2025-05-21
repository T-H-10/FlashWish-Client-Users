import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GreetingCard } from "../../types/GreetingCardsTypes";
import { addGreetingCard, deleteGreetingCard, fetchGreetingCards, updateGreetingCard } from "./GreetingCardsApi";
import { storeType } from "../Store";



const GreetingCardsSlice = createSlice({
    name: 'greetingCards',
    initialState: { greetingCardsList: [] as GreetingCard[], loading: true, selectedCard: null as GreetingCard | null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGreetingCards.fulfilled, (state, action: PayloadAction<GreetingCard[]>) => {
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
            // .addCase(fetchGreetingCardById.fulfilled, (state, action: PayloadAction<GreetingCard>)=>{
            //     state.selectedCard=action.payload;
            // })
            // .addCase(fetchGreetingCardById.rejected, (state, action)=>{
            //     state.loading = false;
            //     handleApiError(action.error);
            // })
            .addCase(addGreetingCard.fulfilled, (state, action: PayloadAction<GreetingCard>) => {
                if(!Array.isArray(state.greetingCardsList)){
                    state.greetingCardsList = [];
                }
                state.greetingCardsList.push(action.payload);
                state.loading = false;
            })
            .addCase(addGreetingCard.pending, (state) => {
                state.loading = true;
            })
            .addCase(addGreetingCard.rejected, (state, action) => {
                state.loading = false;
                handleApiError(action.error);
            })
            .addCase(updateGreetingCard.fulfilled, (state, action: PayloadAction<GreetingCard>) => {
                const index = state.greetingCardsList.findIndex(card => card.cardID === action.payload.cardID);
                if (index >= 0) {
                    state.greetingCardsList[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateGreetingCard.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateGreetingCard.rejected, (state, action) => {
                state.loading = false;
                handleApiError(action.error);
            })
            .addCase(deleteGreetingCard.fulfilled, (state, action: PayloadAction<number>) => {
                state.greetingCardsList = state.greetingCardsList.filter(card => card.cardID !== action.payload);
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

    // Swal.fire({
    //     icon: 'error',
    //     title: 'תקלה!',
    //     text: errorMessage,
    // });
};

export const selectGreetingCards = (state: storeType) => state.greetingCards;

export default GreetingCardsSlice;
