import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { storeType } from '../Store';

// סוגי הנתונים שלך
export interface GreetingCard {
    id: number;
    message: string;
}

// סוג הנתונים של ה-state
interface GreetingCardState {
    cards: GreetingCard[];
    loading: boolean;
    error: string | null;
}

// ערכים התחלתיים
const initialState: GreetingCardState = {
    cards: [],
    loading: false,
    error: null,
};

// יצירת ה-async thunk
export const fetchGreetingCards = createAsyncThunk<GreetingCard[]>(
    'greetingCards/fetch',
    async () => {
        const response = await fetch('/api/greetingCards'); // עדכן את ה-API שלך
        return await response.json();
    }
);

// יצירת ה-slice
const greetingCardSlice = createSlice({
    name: 'greetingCards',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGreetingCards.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGreetingCards.fulfilled, (state, action) => {
                state.loading = false;
                state.cards = action.payload;
            })
            .addCase(fetchGreetingCards.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

// ייצוא ה-reducer
export const greetingCardReducer = greetingCardSlice.reducer;

// ייצוא selector לדוגמה
// export const selectGreetingCards = (state: storeType) => state.greetingCards.cards;
export const selectLoading = (state: storeType) => state.greetingCards.loading;
// export const selectError = (state: storeType) => state.greetingCards.error;
