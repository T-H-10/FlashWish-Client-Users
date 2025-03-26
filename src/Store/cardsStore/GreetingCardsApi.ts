import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from 'sweetalert2';
import { API_URL } from "../../types/UserTypes";
import { GreetingCard, GreetingCardPostModel } from "../../types/GreetingCardsTypes";

const routerURLGreetingCards = API_URL + "/GreetingCards";

export const fetchGreetingCards = createAsyncThunk('greetingCards/fetch', async (_, thunkAPI) => {   
    try {
        const response = await axios.get(routerURLGreetingCards);
        return response.data as GreetingCard[];
    } catch (e: any) {
        return thunkAPI.rejectWithValue({
            message: e.message,
            status: e.response ? e.response.status : 500,
        });
    }
});

export const fetchGreetingCardById = createAsyncThunk('greetingCards/fetchById', async (id: number, thunkAPI) => {
    try {
        const response = await axios.get(`${routerURLGreetingCards}/${id}`);
        console.log(response);
        
        return response.data as GreetingCard;
    } catch (e: any) {
        return thunkAPI.rejectWithValue({
            message: e.message,
            status: e.response ? e.response.status : 500,
        });
    }
});

export const addGreetingCard = createAsyncThunk('greetingCards/add', async ({ newCard }: { newCard: GreetingCardPostModel }, thunkAPI) => {
    try {
        const response = await axios.post(routerURLGreetingCards, newCard);
        Swal.fire('Success', 'הכרטיס נוספה בהצלחה', 'success');
        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue({
            message: e.message,
            status: e.response ? e.response.status : 500,
        });
    }
});

export const updateGreetingCard = createAsyncThunk('greetingCards/update', async ({ id, greetingCard }: { id: number, greetingCard: GreetingCardPostModel }, thunkAPI) => {
    try {
        const response = await axios.put(`${routerURLGreetingCards}/${id}`, greetingCard);
        console.log(response);
        
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
