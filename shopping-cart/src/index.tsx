import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/site.css';
import Root from './routes/Root';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./routes/general/ErrorPage";
import Home from "./routes/general/Home";
import {Navigations} from "./types/strings/Navigations";
import Register from "./routes/general/Register";
import Login from "./routes/general/Login";
import Catalog from "./routes/general/Catalog";
import ItemDetails from "./routes/general/ItemDetails";
import ShoppingCart from "./routes/authorized/ShoppingCart";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: Navigations.LOGIN,
                element: <Login />,
            },
            {
                path: Navigations.REGISTER,
                element: <Register />,
            },
            {
                path: Navigations.CATALOG,
                element: <Catalog />,
            },
            {
                path: Navigations.SHOP_CART,
                element: <ShoppingCart />,
            },
            {
                path: Navigations.ITEM_DETAILS,
                element: <ItemDetails />
            },
        ]
    }
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

reportWebVitals();
