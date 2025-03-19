import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/Applayout";
import Login from "./components/login & register/Login";
import Registration from "./components/login & register/Registration";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import TemplatesGallery from "./components/templates/TemplatesGallery";


export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout/>,
        errorElement: <h1>Error!</h1>,
        children: [
            {path: '/', element: <Home/>},
            { path: 'login', element: <Login/>},
            { path: 'register', element: <Registration/>},
            {path: 'Gallery', element: <Gallery/>,
                children:[
                    {path: 'templates', element: <TemplatesGallery/>}
                ]
             }
            
        ]
    }
])