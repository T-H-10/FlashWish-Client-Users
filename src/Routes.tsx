import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/Applayout";

export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout/>,
        errorElement: <h1>Error!</h1>,
        children: [
            // {path: '/', element: <Home/>},
            // { path: 'login', element: <Login/>},
            
        ]
    }
])