import { combineSlices, configureStore } from "@reduxjs/toolkit";
import TemplatesSlice from "./templatesStore/TemplatesSlice";
import CategoriesSlice from "./ctagoriesStore/CategoriesSlice";
import GreetingMessagesSlice from "./messagesStore/GreetingMessagesSlice";
import GreetingCardsSlice from "./cardsStore/GreetingCardsSlice";
import CurrentGreetingCardSlice from "./cardsStore/CurrentGreetingCardSlice";


const Store = configureStore({
    reducer: combineSlices(
       TemplatesSlice,
       CategoriesSlice,
       GreetingMessagesSlice,
       GreetingCardsSlice,
       CurrentGreetingCardSlice
    ),
});

export type storeType = ReturnType<typeof Store.getState>
export type appDispatch = typeof Store.dispatch;
export default Store;


