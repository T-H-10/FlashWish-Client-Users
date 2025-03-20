import { combineSlices, configureStore } from "@reduxjs/toolkit";
import templatesSlice from "./TemplatesStore/TemplatesSlice";
import categoriesSlice from "./CtagoriesStore/CategoriesSlice";


const Store = configureStore({
    reducer: combineSlices(
       templatesSlice,
       categoriesSlice
    ),
});

export type storeType = ReturnType<typeof Store.getState>
export type appDispatch = typeof Store.dispatch;
export default Store;


