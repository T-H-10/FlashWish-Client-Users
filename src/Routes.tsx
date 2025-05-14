import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/Applayout";
import Registration from "./components/login & register/Registration";
import Home from "./components/homePage/Home";
import Gallery from "./components/Gallery";
import TemplatesGallery from "./components/templates/TemplatesGallery";
import GreetingMessagesGallery from "./components/messages/MessagesGallery";
import CreatingCard from "./components/creatingCard/CreatingCard";
import MyCardsGallery from "./components/myCards/MyCardsGallery";
import Login from "./components/login & register/Login";

export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout/>,
        errorElement: <h1>Error!</h1>,
        children: [
            {path: '/', element: <Home/>},
            { path: 'login', element: <Login/>},
            { path: 'register', element: <Registration/>},
            {path: 'myCards', element: <MyCardsGallery/>},
            {path: 'Gallery', element: <Gallery/>,
                children:[
                    {path: 'templates', element: <TemplatesGallery/>},
                    {path: 'content', element: <GreetingMessagesGallery/>}
                ]
            },
            { path: 'creatingCard', element: <CreatingCard/>,
                children:[
                    {path: '', element: <TemplatesGallery/>}
                ]
            },
            
        ]
    }
])