import {FaMinus, FaPlus} from "react-icons/fa";
import React from "react";
import IShopItemDetails from "../../../types/dto/domain/shop-items/IShopItemDetails";
import Patterns from "../../../types/strings/Patterns";

interface ItemDetailsViewProps {
    item: IShopItemDetails;
    quantity: number;
    isAuthorized: boolean;
    handleSetAmount: () => void;
    handleQuantityChange: (newQuantity: number) => void;
}
const ItemDetailsView = (props: ItemDetailsViewProps) => {

    return (<div className="item-details-container">
        <div className="item-image">
            <img src={`${Patterns.DECODE_IMG}${props.item.itemPicture}`} alt={props.item.name} />
        </div>
        <div className="item-info">
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>
            <p className="item-price">Price: ${props.item.price}</p>
            <p className="item-rating">Rating: {props.item.rating}</p>
            <p className="item-stock">In Stock: {props.item.stockAmount}</p>

            {props.isAuthorized ? (
                <div className="item-quantity">
                    <button
                        className="quantity-btn"
                        onClick={() => props.handleQuantityChange(props.quantity - 1)}
                        disabled={props.quantity <= 0}
                    >
                        <FaMinus />
                    </button>
                    <input
                        type="number"
                        value={props.quantity}
                        onChange={(e) => props.handleQuantityChange(parseInt(e.target.value))}
                        min={1}
                        max={props.item.stockAmount || 1}
                    />
                    <button
                        className="quantity-btn"
                        onClick={() => props.handleQuantityChange(props.quantity + 1)}
                        disabled={props.quantity >= (props.item.stockAmount || 0)}
                    >
                        <FaPlus />
                    </button>
                </div>
            ) : (
                <p className="guest-message">Log in to add items to your cart.</p>
            )}

            {props.isAuthorized && (
                <div className="item-actions">
                    <button className="add-to-cart-btn" onClick={props.handleSetAmount}>
                        Set desired quantity
                    </button>
                </div>
            )}
        </div>
    </div>)
}

export default ItemDetailsView;