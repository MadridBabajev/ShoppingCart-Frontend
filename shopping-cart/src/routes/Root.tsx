import React, {useEffect, useState} from 'react';
import './types/App.css';
import INotification from "../types/props/layout/INotification";
import IJWTResponse from "../types/dto/identity/IJWTResponse";
import {notificationManager} from "../helpers/NotificationManager";
import Header from "../components/layout/Header";
import {Outlet} from "react-router-dom";
import Footer from "../components/layout/Footer";
import JwtContext from "../types/context/jwt-context/JwtContext";
import NotificationPopup from "../components/layout/NotificationPopup";
import {JwtRefreshEvent} from "../services/base-services/BaseService";
import RefreshEvents from "../types/strings/refresh-events/RefreshEvents";

const Root = () => {
    const [jwtResponse, setJwtResponse] = useState<IJWTResponse | null>(null);
    const [notification, setNotification] = useState<INotification>({ message: '', color: '' });

    useEffect(() => {
        notificationManager.setNotificationCallback(setNotification);
    }, []);

    useEffect(() => {
        const listener = (newJwtResponse: IJWTResponse) => {
            setJwtResponse(newJwtResponse);
        };

        JwtRefreshEvent.on(RefreshEvents.JWT_REFRESH_EVENT, listener);

        return () => {
            JwtRefreshEvent.off(RefreshEvents.JWT_REFRESH_EVENT, listener);
        };
    }, []);

    return (
        <JwtContext.Provider value={{ jwtResponse, setJwtResponse }}>
            <Header />
            <div className="container">
                <main style={{ marginTop: "160px" }} role="main" className="pb-3">
                    <Outlet />
                </main>
            </div>
            <NotificationPopup notification={notification} setNotification={setNotification} />
            <Footer />
        </JwtContext.Provider>
    );
}

export default Root;
