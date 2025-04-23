import { createContext, Dispatch, useReducer, useState } from 'react';
import './App.css'
import Store from './Store/Store'
import UserReducer from './Store/userReducer/UserReducer';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes';
import { initialUserState, UserContext } from './types/UserTypes';
import CardReducer, { CurrentCardContext } from './Store/cardReducer/CardReducer';
import { initialGreetingCardState } from './types/GreetingCardsTypes';

export const IsLogin = createContext<[boolean, Dispatch<React.SetStateAction<boolean>>]>([false, () => null])
const App = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [user, userDispatch] = useReducer(UserReducer, initialUserState);
  const [currentCard, cardDispatch] = useReducer(CardReducer, initialGreetingCardState);
  return (
    <>
      <title>FlashWish</title>
      <IsLogin value={[isLogin, setIsLogin]}>
        <UserContext value={{ user, userDispatch }}>
          <CurrentCardContext value={{ currentCard, cardDispatch }}>
            <Provider store={Store}>
              <RouterProvider router={router} />
            </Provider>
          </CurrentCardContext>
        </UserContext>
      </IsLogin>
    </>
  )
}

export default App
