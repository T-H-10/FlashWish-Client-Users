import { createContext, Dispatch, useReducer, useState } from 'react';
import './App.css'
import Store from './Store/Store'
import UserReducer from './Store/UserReducer/UserReducer';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes';
import { initialUserState, UserContext } from './Types/UserTypes';

export const IsLogin = createContext<[boolean, Dispatch<React.SetStateAction<boolean>>]>([false, () => null])
const App=()=>{
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [user, userDispatch] = useReducer(UserReducer, initialUserState);

  return (
    <>
    <title>FlashWish</title>
    <IsLogin value={[isLogin, setIsLogin]}>
    <UserContext value={{user,userDispatch}}>
    <Provider store={Store}>
      <RouterProvider router={router}/>
    </Provider>
    </UserContext>
    </IsLogin>
    </>
  )
}

export default App
