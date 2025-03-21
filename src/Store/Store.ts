import { combineSlices, configureStore } from "@reduxjs/toolkit";
import templatesSlice from "./templatesStore/TemplatesSlice";
import categoriesSlice from "./ctagoriesStore/CategoriesSlice";


const Store = configureStore({
    reducer: combineSlices(
       templatesSlice,
       categoriesSlice
    ),
});

export type storeType = ReturnType<typeof Store.getState>
export type appDispatch = typeof Store.dispatch;
export default Store;


