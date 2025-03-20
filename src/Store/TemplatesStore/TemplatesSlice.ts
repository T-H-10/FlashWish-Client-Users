import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addTemplate, deleteTemplate, fetchTemplates, updateTemplate } from "./TemplatesApi";
import Swal from 'sweetalert2';
import { Template } from "../../Types/TemplateType";
import { storeType } from "../Store";

const templatesSlice = createSlice({
    name: 'templates',
    initialState: { templatesList: [] as Template[], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTemplates.fulfilled, (state, action) => {
                state.templatesList = action.payload;
                state.loading = false;                
            })
            .addCase(fetchTemplates.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTemplates.rejected, (state, action) => {
                state.loading = false;
                handleApiError(action.error);
            })
            .addCase(addTemplate.fulfilled, (state, action: PayloadAction<Template>) => {
                state.templatesList = [...state.templatesList, { ...action.payload }];
                state.loading = false;
            })
            .addCase(addTemplate.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTemplate.rejected, (state, action) => {
                state.loading = false;
                handleApiError(action.error);
            })
            .addCase(updateTemplate.fulfilled, (state, action: PayloadAction<Template>) => {
                const index = state.templatesList.findIndex((template: Template) => template.templateID === action.payload.templateID);
                if (index >= 0) {
                    state.templatesList[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateTemplate.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTemplate.rejected, (state, action) => {
                state.loading = false;
                handleApiError(action.error);
            })
            .addCase(deleteTemplate.fulfilled, (state, action: PayloadAction<number>) => { ///number and not template.
                state.templatesList = state.templatesList.filter((template: Template) => template.templateID !== action.payload);
                state.loading = false;
            })
            .addCase(deleteTemplate.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTemplate.rejected, (state, action) => {
                state.loading = false;
                handleApiError(action.error);
            });
    }
});

const handleApiError = (error: any) => {
    let errorMessage = 'נסה מאוחר יותר.';
    
    // דוגמת טיפול בשגיאות
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

export const selectTemplates = (state: storeType) => state.templates;
export default templatesSlice;
