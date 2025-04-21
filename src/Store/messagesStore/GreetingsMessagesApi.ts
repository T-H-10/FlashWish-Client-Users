import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../types/UserTypes";
import Swal from "sweetalert2";
import { GreetingMessage, GreetingMessagePostModel } from "../../types/GreetingMessageType";

const routerURLMessages = API_URL+"/GreetingMessages";

export const fetchGreetingMessages = createAsyncThunk('greetingMessages/fetch', async (_, thunkAPI) => {
    try {
        const response = await axios.get(routerURLMessages);
        return response.data as GreetingMessage[];
    } catch (e: any) {
        return thunkAPI.rejectWithValue({
            message: e.message,
            status: e.response ? e.response.status : 500,
        });
    }
});

export const addGreetingMessage = createAsyncThunk('greetingMessages/add', async (message: GreetingMessagePostModel, thunkAPI) => {
    try {
        const response = await axios.post(routerURLMessages, message);
        Swal.fire('Success', 'הכרטיס נוספה בהצלחה', 'success');
        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue({
            message: e.message,
            status: e.response ? e.response.status : 500,
        });
    }
});

export const updateGreetingMessage = createAsyncThunk('greetingMessages/update', async ({ id, message }: { id: number, message: GreetingMessagePostModel }, thunkAPI) => {
    try {
        const response = await axios.put(`${routerURLMessages}/${id}`, message);//לבדוק האם צריך להוסיף : לפני הid.
        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue({
            message: e.message,
            status: e.response ? e.response.status : 500,
        });
    }
});

export const deleteGreetingMessage = createAsyncThunk('greetingMessages/delete', async (id: number, thunkAPI) => {
    try {
        await axios.delete(`${routerURLMessages}/${id}`);
        return id;
    } catch (e: any) {
        return thunkAPI.rejectWithValue({
            message: e.message,
            status: e.response ? e.response.status : 500,
        });
    }
});