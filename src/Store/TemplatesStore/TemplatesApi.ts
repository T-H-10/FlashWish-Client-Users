import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import Swal from 'sweetalert2';
import { API_URL } from "../../Types/UserTypes";
import { Template, TemplatePostModel } from "../../Types/TemplateType";

const routerURLTemplates = API_URL+"/templates";

export const fetchTemplates = createAsyncThunk('templates/fetch', async (_, thunkAPI) => {
    try {
        const response = await axios.get(routerURLTemplates);
        return response.data as Template[];
    } catch (e: any) {
        return thunkAPI.rejectWithValue({
            message: e.message,
            status: e.response ? e.response.status : 500,
        });
    }
});

export const addTemplate = createAsyncThunk('templates/add', async ({ newTemplate, userId }: { newTemplate: TemplatePostModel, userId: number }, thunkAPI) => {
    try {
        const response = await axios.post(routerURLTemplates, newTemplate, {
            headers: { "User-id": userId }
        });
        Swal.fire('Success', 'התבנית נוספה בהצלחה', 'success');
        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue({
            message: e.message,
            status: e.response ? e.response.status : 500,
        });
    }
});

export const updateTemplate = createAsyncThunk('templates/update', async ({ id, updatedTemplate }: { id: number, updatedTemplate: TemplatePostModel }, thunkAPI) => {
    try {
        const response = await axios.put(`${routerURLTemplates}/:${id}`, updatedTemplate);
        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue({
            message: e.message,
            status: e.response ? e.response.status : 500,
        });
    }
});

export const deleteTemplate = createAsyncThunk('templates/delete', async (id: number, thunkAPI) => {
    try {
        await axios.delete(`${routerURLTemplates}/${id}`);
        return id; // מחזירים את ה-ID למחיקה
    } catch (e: any) {
        return thunkAPI.rejectWithValue({
            message: e.message,
            status: e.response ? e.response.status : 500,
        });
    }
});