import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/Applayout";
import Login from "./components/login & register/Login";
import Registration from "./components/login & register/Registration";

export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout/>,
        errorElement: <h1>Error!</h1>,
        children: [
            // {path: '/', element: <Home/>},
            { path: 'login', element: <Login/>},
            { path: 'register', element: <Registration/>}
            
        ]
    }
])