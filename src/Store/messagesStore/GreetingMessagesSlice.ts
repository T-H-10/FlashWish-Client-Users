// Store/greetingMessagesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { addGreetingMessage, deleteGreetingMessage, fetchGreetingMessages, updateGreetingMessage } from './GreetingsMessagesApi';
import { storeType } from '../Store';
import { GreetingMessage } from '../../types/GreetingMessageType';

const GreetingMessagesSlice = createSlice({
    name: 'greetingMessages',
    initialState: { greetingMessagesList: [] as GreetingMessage[], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGreetingMessages.fulfilled, (state, action) => {
                state.greetingMessagesList = action.payload;
                state.loading = false;
            })
            .addCase(fetchGreetingMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchGreetingMessages.rejected, (state, action) => {
                state.loading = false;
                handleApiError(action.error);
            })
            .addCase(addGreetingMessage.fulfilled, (state, action) => {
                state.greetingMessagesList = [...state.greetingMessagesList, {...action.payload}];
                state.loading = false;
            })
            .addCase(addGreetingMessage.pending, (state) => {
                state.loading = true;
            })
            .addCase(addGreetingMessage.rejected, (state, action) => {
                state.loading = false;
                handleApiError(action.error);
            })
            .addCase(updateGreetingMessage.fulfilled, (state, action) => {
                const index = state.greetingMessagesList.findIndex((msg:GreetingMessage) => msg.textID === action.payload.textID);
                if (index >= 0) {
                    state.greetingMessagesList[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateGreetingMessage.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateGreetingMessage.rejected, (state, action) => {
                state.loading = false;
                handleApiError(action.error);
            })
            .addCase(deleteGreetingMessage.fulfilled, (state, action: PayloadAction<number>) => {
                state.greetingMessagesList = state.greetingMessagesList.filter((msg:GreetingMessage) => msg.textID !== action.payload);
                state.loading = false;
            })
            .addCase(deleteGreetingMessage.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteGreetingMessage.rejected, (state, action) => {
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

export const selectGreetingMessages = (state: storeType) => state.greetingMessages;
export default GreetingMessagesSlice;
