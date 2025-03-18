import { useReducer } from 'react';
import './App.css'
import Store, { UserContext } from './Store/Store'
import UserReducer from './Store/UserReducer';
import { initialUserState } from './Types';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes';

const App=()=>{

  const [user, userDispatch] = useReducer(UserReducer, initialUserState);

  return (
    <>
    <title>FlashWish</title>
    <UserContext value={{user,userDispatch}}>
    <Provider store={Store}>
      <RouterProvider router={router}/>
    </Provider>
    </UserContext>
    </>
  )
}

export default App
