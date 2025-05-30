import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../types/UserTypes";
import { GreetingCard, GreetingCardPostModel } from "../../types/GreetingCardsTypes";
import axios from "axios";

const routerURLGreetingCards = `${API_URL}/GreetingCards`;

export const fetchGreetingCards = createAsyncThunk('greetingCards/fetch', async (_, thunkAPI) => {
    try {
        const userId = localStorage.getItem('userId')||'0';
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
// export const fetchGreetingCardById = createAsyncThunk('greetingCards/fetchById', async (id: number, thunkAPI)=>{
//     try{
//         const response = await axios.get<GreetingCard>(`${routerURLGreetingCards}/${id}`);
//         return response.data as GreetingCard;
//     } catch (e: any){
//         return thunkAPI.rejectWithValue({
//             message: e.message,
//             status: e.response? e.response.status : 500,
//         });
//     }
// });

export const addGreetingCard = createAsyncThunk('greetingCards/add', async (newCard: GreetingCardPostModel, thunkAPI) => {
    try {
        const response = await axios.post(routerURLGreetingCards, newCard,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
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
        const response = await axios.put(`${routerURLGreetingCards}/${id}`, updatedCard,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
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
        await axios.delete(`${routerURLGreetingCards}/${id}`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
        return id; // מחזירים את ה-ID למחיקה
    } catch (e: any) {
        return thunkAPI.rejectWithValue({
            message: e.message,
            status: e.response ? e.response.status : 500,
        });
    }
});

