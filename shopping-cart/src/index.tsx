import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/_base.scss';
import Root from './routes/Root';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./routes/guest/ErrorPage";
import Home from "./routes/guest/Home";
import {Navigations} from "./types/navigations/Navigations";
import Register from "./routes/guest/Register";
import Login from "./routes/guest/Login";
import Catalog from "./routes/guest/Catalog";
import ItemDetails from "./routes/guest/ItemDetails";
import ShoppingCart from "./routes/authorized/ShoppingCart";
import 'bootstrap/dist/css/bootstrap.min.css';

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
