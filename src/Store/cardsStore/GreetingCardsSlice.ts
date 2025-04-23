import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import { GreetingCard } from "../../types-change/GreetingCardsTypes";
import { addGreetingCard, deleteGreetingCard, fetchGreetingCards, updateGreetingCard } from "./GreetingCardsApi";
// import { GreetingCard, GreetingCardPostModel } from "../../types/GreetingCardType";



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
            .addCase(addGreetingCard.fulfilled, (state, action: PayloadAction<GreetingCard>) => {
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

    Swal.fire({
        icon: 'error',
        title: 'תקלה!',
        text: errorMessage,
    });
};

export const selectGreetingCards = (state: any) => state.greetingCards;

export default GreetingCardsSlice;


// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import Swal from 'sweetalert2';
// import { storeType } from "../Store";
// import { GreetingCard, initialGreetingCardState } from "../../types/GreetingCardsTypes";
// import { addGreetingCard, deleteGreetingCard, fetchGreetingCardById, fetchGreetingCards, updateGreetingCard } from "./GreetingCardsApi";

// const GreetingCardsSlice = createSlice({
//     name: 'greetingCards',
//     initialState: { greetingCardsList: [] as GreetingCard[], loading: true },
//     reducers: {
//         // selectGreetingCard: (state, action: PayloadAction<GreetingCard>) => {
//         //     state.selectedGreetingCard = action.payload;
//         // },
//         // clearSelectedGreetingCard: (state) => {
//         //     state.selectedGreetingCard = initialGreetingCardState;
//         // }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchGreetingCards.fulfilled, (state, action) => {
//                 state.greetingCardsList = action.payload;
//                 state.loading = false;
//             })
//             .addCase(fetchGreetingCards.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchGreetingCards.rejected, (state, action) => {
//                 state.loading = false;
//                 handleApiError(action.error);
//             })
//             // .addCase(fetchGreetingCardById.fulfilled, (state, action: PayloadAction<GreetingCard>) => {
//             //     // כאן תוכל לעדכן את ה-state עם הכרטיס שהתקבל
//             //     state.selectedGreetingCard = action.payload; // תוודאי שהוספת selectedGreetingCard ל-initialState
//             // })
//             // .addCase(fetchGreetingCardById.rejected, (state, action) => {
//             //     handleApiError(action.error);
//             // })
//             .addCase(addGreetingCard.fulfilled, (state, action: PayloadAction<GreetingCard>) => {
//                 // state.selectedGreetingCard={...action.payload};
//                 // console.log(state.selectedGreetingCard);
                
//                 state.greetingCardsList = [...state.greetingCardsList, { ...action.payload }];
//                 state.loading = false;
//             })
//             .addCase(addGreetingCard.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(addGreetingCard.rejected, (state, action) => {
//                 state.loading = false;
//                 handleApiError(action.error);
//             })
//             .addCase(updateGreetingCard.fulfilled, (state, action: PayloadAction<GreetingCard>) => {

//                 // console.log(action.payload);

//                 const index = state.greetingCardsList.findIndex((card) => card.textID === action.payload.textID);
//                 if (index >= 0) {
//                     state.greetingCardsList[index] = action.payload;
//                 }
//                 state.loading = false;
//                 // console.log(state.greetingCardsList);

//             })
//             .addCase(updateGreetingCard.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(updateGreetingCard.rejected, (state, action) => {
//                 state.loading = false;
//                 handleApiError(action.error);
//             })
//             .addCase(deleteGreetingCard.fulfilled, (state, action: PayloadAction<number>) => {
//                 state.greetingCardsList = state.greetingCardsList.filter((card) => card.textID !== action.payload);
//                 state.loading = false;
//             })
//             .addCase(deleteGreetingCard.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(deleteGreetingCard.rejected, (state, action) => {
//                 state.loading = false;
//                 handleApiError(action.error);
//             });
//     }
// });

// const handleApiError = (error: any) => {
//     let errorMessage = 'נסה מאוחר יותר.';

//     if (error.message.includes('401')) {
//         errorMessage = 'שגיאת אימות. אנא התחבר מחדש.';
//     } else if (error.message.includes('400')) {
//         errorMessage = 'נתונים חסרים או לא תקינים.';
//     } else if (error.message.includes('500')) {
//         errorMessage = 'שגיאה בשרת. נסו שוב מאוחר יותר.';
//     }

//     Swal.fire({
//         icon: 'error',
//         title: 'תקלה!',
//         text: errorMessage,
//     });
// };
// // export const { selectGreetingCard, clearSelectedGreetingCard } = GreetingCardsSlice.actions;
// // export const selectSelectedGreetingCard = (state: storeType) => state.greetingCards.selectedGreetingCard;
// export const selectGreetingCards = (state: storeType) => state.greetingCards;
// export default GreetingCardsSlice;
