import { combineSlices, configureStore } from "@reduxjs/toolkit";
import templatesSlice from "./TemplatesStore/TemplatesSlice";


const Store = configureStore({
    reducer: combineSlices(
       templatesSlice,
    ),
});

export type storeType = ReturnType<typeof Store.getState>
export type appDispatch = typeof Store.dispatch;
export default Store;


