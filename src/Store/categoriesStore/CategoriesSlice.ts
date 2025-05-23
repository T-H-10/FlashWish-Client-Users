import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addCategory, deleteCategory, fetchCategories, updateCategory } from "./CategoriesApi";
import { Category } from "../../types/CategoryTypes";
import { storeType } from "../Store";

const CategoriesSlice = createSlice({
    name: 'categories',
    initialState: { categoriesList: [] as Category[], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categoriesList = action.payload;
                state.loading = false;
            })
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                handleApiError(action.error);
            })
            .addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                if(!Array.isArray(state.categoriesList)){
                    state.categoriesList = [];
                }
                state.categoriesList.push(action.payload);
                state.loading = false;
            })
            .addCase(addCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.loading = false;
                handleApiError(action.error);
            })
            .addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                const index = state.categoriesList.findIndex(category => category.categoryID === action.payload.categoryID);
                if (index >= 0) {
                    state.categoriesList[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                handleApiError(action.error);
            })
            .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<number>) => {
                state.categoriesList = state.categoriesList.filter(category => category.categoryID !== action.payload);
                state.loading = false;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                handleApiError(action.error);
            });
    }
});

const handleApiError = (error: any) => {
    let errorMessage = 'נסה מאוחר יותר.';
    console.log(errorMessage);
    
    if (error.message.includes('401')) {
        errorMessage = 'שגיאת אימות. אנא התחבר מחדש.';
    } else if (error.message.includes('400')) {
        errorMessage = 'נתונים חסרים או לא תקינים.';
    } else if (error.message.includes('500')) {
        errorMessage = 'שגיאה בשרת. נסו שוב מאוחר יותר.';
    }

    // Swal.fire({
    //     icon: 'error',
    //     title: 'תקלה!',
    //     text: errorMessage,
    // });
};

export const selectCategories = (state: storeType) => state.categories;
export default CategoriesSlice;
