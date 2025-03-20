import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import Swal from 'sweetalert2';
import { API_URL } from "../../Types/UserTypes";
import { Template, TemplatePostModel } from "../../Types/TemplateType";

const routerURLTemplates = API_URL+"/Templates";

export const fetchTemplates = createAsyncThunk('templates/fetch', async (_, thunkAPI) => {
    console.log("in fetch templates");
    
    try {
        const response = await axios.get(routerURLTemplates);
        console.log(response.data);
        return response.data as Template[];
    } catch (e: any) {
        return thunkAPI.rejectWithValue({
            message: e.message,
            status: e.response ? e.response.status : 500,
        });
    }
});

export const addTemplate = createAsyncThunk('templates/add', async ({ newTemplate }: { newTemplate: TemplatePostModel }, thunkAPI) => {
    try {
        const formData= new FormData();
        formData.append('templateName', newTemplate.templateName);
        formData.append('categoryID', newTemplate.categoryID.toString());
        formData.append('userID', newTemplate.userID.toString());
        formData.append('ImageFile', newTemplate.image);      
        const response = await axios.post(routerURLTemplates, formData,
            {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
    );
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