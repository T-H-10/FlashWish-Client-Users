import { combineSlices, configureStore } from "@reduxjs/toolkit";
import TemplatesSlice from "./templatesStore/TemplatesSlice";
import CategoriesSlice from "./ctagoriesStore/CategoriesSlice";
import GreetingMessagesSlice from "./messagesStore/GreetingMessagesSlice";


const Store = configureStore({
    reducer: combineSlices(
       TemplatesSlice,
       CategoriesSlice,
       GreetingMessagesSlice
    ),
});

export type storeType = ReturnType<typeof Store.getState>
export type appDispatch = typeof Store.dispatch;
export default Store;


