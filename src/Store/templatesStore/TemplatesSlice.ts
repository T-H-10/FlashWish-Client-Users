import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addTemplate, deleteTemplate, fetchTemplateById, fetchTemplates, updateTemplate } from "./TemplatesApi";
import Swal from 'sweetalert2';
import { initialTemplate, Template } from "../../types/TemplateType";
import { storeType } from "../Store";

const TemplatesSlice = createSlice({
    name: 'templates',
    initialState: { templatesList: [] as Template[], loading: true, selectedTemplate: initialTemplate },
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
            .addCase(fetchTemplateById.fulfilled, (state, action: PayloadAction<Template>) => {
                // כאן תוכל לעדכן את ה-state עם התבנית שהתקבלה
                state.selectedTemplate = action.payload; // תוודאי שהוספת selectedTemplate ל-initialState
            })
            .addCase(fetchTemplateById.rejected, (state, action) => {
                state.loading = false;
                handleApiError(action.error);
            })
            .addCase(addTemplate.fulfilled, (state, action: PayloadAction<Template>) => {
                state.templatesList.push(action.payload);
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
export const selectSelectedTemplate = (state: storeType) => state.templates.selectedTemplate;
export const selectTemplates = (state: storeType) => state.templates;
export default TemplatesSlice;
