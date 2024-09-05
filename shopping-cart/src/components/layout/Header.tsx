import {useCallback, useContext, useEffect, useState} from "react";
import JwtContext from "../../types/context/jwt-context/JwtContext";
import {Link, useNavigate} from "react-router-dom";
import LocalStorage from "../../types/strings/local-storage/LocalStorage";
import {Navigations} from "../../types/navigations/Navigations";
import logo from "../../assets/logo.png";
import {IdentityService} from "../../services/app-services/Identity/IdentityService";
import IHeaderLinksViewProps from "../../types/props/layout/IHeaderProps";
import '../../styles/layout/header.scss';
import {notificationManager} from "../../helpers/NotificationManager";
import {NotificationMessages} from "../../types/strings/notifications/NotificationMessages";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const { jwtResponse } = useContext(JwtContext);

    const handleStorageChange = useCallback(() => {
        let jwtToken = localStorage.getItem(LocalStorage.JWT);
        if (jwtToken) setIsLoggedIn(true);
        else setIsLoggedIn(false);

    }, []);

    useEffect(() => {
        // Initial check
        handleStorageChange();
        window.addEventListener('storage', handleStorageChange);
        // Remove event listener on cleanup
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [jwtResponse, handleStorageChange]);

    return (
        <header className="navBar">
            <Link to={"/"}><img className="header-logo" alt="logo" src={logo}/></Link>
            <HeaderLinks isLoggedIn={isLoggedIn} />
        </header>
    );
};

const HeaderLinks = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    const identityService = new IdentityService();
    const navigate = useNavigate();
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);

    const logout = async () => {
        if (jwtResponse) {
            const success = await identityService.logout({ refreshToken: jwtResponse.refreshToken });
            if (success) {
                // Clear local storage first
                localStorage.clear();

                // Now update the state
                if (setJwtResponse) setJwtResponse(null);
            }
            notificationManager.showErrorNotification(NotificationMessages.USER_LOG_OUT);
            navigate("/");
        }
    }

    return <HeaderLinksView isLoggedIn={isLoggedIn} logout={logout} />
};

const HeaderLinksView = ({isLoggedIn, logout}: IHeaderLinksViewProps) => {
    return (
        <div className="right-nav-items">
            <Link to={Navigations.CATALOG} className="right-nav-item">Catalog</Link>
            { isLoggedIn && <Link to={Navigations.SHOP_CART} className="right-nav-item">My Shopping cart</Link>}
            { isLoggedIn && <button onClick={logout} className="right-nav-item header-login-logout-btn">Logout</button>}
            { !isLoggedIn && <Link to={Navigations.REGISTER} className="right-nav-item">Register</Link>}
            { !isLoggedIn && <Link to={Navigations.LOGIN} className="right-nav-item btn-primary header-login-logout-btn">Log in</Link>}
        </div>
    )
};

export default Header;