import React from 'react';
import '../../styles/pages/home.scss';
import jwt_img from "../../assets/jwt.png";
import add_to_cart_img from "../../assets/add-to-cart.png";
import scalable_img from "../../assets/scalable.png";
import JwtContext from "../../types/context/jwt-context/JwtContext";
import {useNavigate} from "react-router-dom";
import {Navigations} from "../../types/navigations/Navigations";

interface FeatureCardProps {
    image: string;
    title: string;
    description: string;
}

const Home = () => {
    const {jwtResponse} = React.useContext(JwtContext);
    const isAuthorized = !!jwtResponse;
    const navigate = useNavigate();

    return (
        <div className="homepage">
            <div className="hero">
                <h1>Welcome to ShoppingCart!</h1>
                <p>A great solution for managing your online shopping cart. Easily add items to your cart, view details, and check out, all in one place.</p>
            </div>

            <div className="features">
                <FeatureCard
                    image={jwt_img}
                    title={"Secure Login"}
                    description={"Login securely using JWT authentication and manage your shopping cart safely."}
                />
                <FeatureCard
                    image={add_to_cart_img}
                    title={"Easy Item Management"}
                    description={"Add, view, and remove items from your cart effortlessly. Your items are always available to you."}
                />
                <FeatureCard
                    image={scalable_img}
                    title={"Scalable application"}
                    description={"The application is setup in a way that it is easy to implement changes and new features."}
                />
            </div>

            <div className="get-started">
                <h2>Get Started Today!</h2>
                <p>Sign up or log in to begin your shopping experience. Your cart awaits!</p>
                <button onClick={() => navigate(`${isAuthorized ? Navigations.SHOP_CART : Navigations.REGISTER}`)} className="primary-button">{isAuthorized ? "Go to my cart!" : "Register now!"}</button>
            </div>
        </div>
    );
}

const FeatureCard = ({ image, title, description }: FeatureCardProps) => {
    return (
        <div className="feature-item">
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

export default Home;