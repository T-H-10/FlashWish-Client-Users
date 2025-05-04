import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../types/UserTypes";
import { GreetingCard, GreetingCardPostModel } from "../../types/GreetingCardsTypes";
import axios from "axios";

const routerURLGreetingCards = `${API_URL}/GreetingCards`;

export const fetchGreetingCards = createAsyncThunk('greetingCards/fetch', async (_, thunkAPI) => {
    try {
        const userId = sessionStorage.getItem('userId')||'0';
        console.log(userId);

        const response = await axios.get(routerURLGreetingCards + '/MyCards/' + userId);
        // if (response.status !== 200) {
        //     console.log(response)
        //     return [] as GreetingCard[];
        // }
        // else {
            return response.data as GreetingCard[];
        // }
    } catch (e: any) {
        return thunkAPI.rejectWithValue({
            message: e.message,
            status: e.response ? e.response.status : 500,
        });
    }
});

export const addGreetingCard = createAsyncThunk('greetingCards/add', async (newCard: GreetingCardPostModel, thunkAPI) => {
    try {
        const response = await axios.post(routerURLGreetingCards, newCard);
        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue({
            message: e.message,
            status: e.response ? e.response.status : 500,
        });
    }
});

export const updateGreetingCard = createAsyncThunk('greetingCards/update', async ({ id, updatedCard }: { id: number, updatedCard: GreetingCardPostModel }, thunkAPI) => {
    try {
        const response = await axios.put(`${routerURLGreetingCards}/${id}`, updatedCard);
        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue({
            message: e.message,
            status: e.response ? e.response.status : 500,
        });
    }
});

export const deleteGreetingCard = createAsyncThunk('greetingCards/delete', async (id: number, thunkAPI) => {
    try {
        await axios.delete(`${routerURLGreetingCards}/${id}`);
        return id; // מחזירים את ה-ID למחיקה
    } catch (e: any) {
        return thunkAPI.rejectWithValue({
            message: e.message,
            status: e.response ? e.response.status : 500,
        });
    }
});

