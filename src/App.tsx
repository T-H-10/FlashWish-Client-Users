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

export const IsLogin = createContext<[boolean, Dispatch<React.SetStateAction<boolean>>]>([false, () => {}]);

const App = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [user, userDispatch] = useReducer(UserReducer, initialUserState);
  const [currentCard, cardDispatch] = useReducer(CardReducer, initialGreetingCardState);
  
  return (
    <>
      {/* <title>FlashWish</title> */}
      {/* לבדוק האם חייבים provider */}
      <IsLogin.Provider value={[isLogin, setIsLogin]}> 
        <UserContext.Provider value={{ user, userDispatch }}>
          <CurrentCardContext.Provider value={{ currentCard, cardDispatch }}>
            <Provider store={Store}>
              {/* <AlertProvider> */}
              <RouterProvider router={router} />
              {/* </AlertProvider> */}
            </Provider>
          </CurrentCardContext.Provider>
        </UserContext.Provider>
      </IsLogin.Provider>
    </>
  )
}

export default App
