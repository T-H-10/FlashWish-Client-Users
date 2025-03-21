import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../types/UserTypes";
import { Category, CategoryPostModel } from "../../types/CategoryTypes";

const routerURLCategories = `${API_URL}/Categories`;

export const fetchCategories = createAsyncThunk('categories/fetch', async (_, thunkAPI) => {
    try {
        const response = await axios.get(routerURLCategories);       
        return response.data as Category[];
    } catch (e: any) {
        return thunkAPI.rejectWithValue({
            message: e.message,
            status: e.response ? e.response.status : 500,
        });
    }
});

export const addCategory = createAsyncThunk('categories/add', async (categoryName: CategoryPostModel, thunkAPI) => {
    try {
        const response = await axios.post(routerURLCategories, {categoryName});
        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue({
            message: e.message,
            status: e.response ? e.response.status : 500,
        });
    }
});

export const updateCategory = createAsyncThunk('categories/update', async ({ id, updatedCategory }: { id: number, updatedCategory: CategoryPostModel }, thunkAPI) => {
    try {
        const response = await axios.put(`${routerURLCategories}/${id}`, updatedCategory);
        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue({
            message: e.message,
            status: e.response ? e.response.status : 500,
        });
    }
});

export const deleteCategory = createAsyncThunk('categories/delete', async (id: number, thunkAPI) => {
    try {
        await axios.delete(`${routerURLCategories}/${id}`);
        return id;
    } catch (e: any) {
        return thunkAPI.rejectWithValue({
            message: e.message,
            status: e.response ? e.response.status : 500,
        });
    }
});
