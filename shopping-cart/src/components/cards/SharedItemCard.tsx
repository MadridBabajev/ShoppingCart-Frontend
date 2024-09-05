import {FaMinus, FaPlus} from "react-icons/fa";
import IShopItemListElement from "../../types/dto/domain/shop-items/IShopItemListElement";
import Patterns from "../../types/strings/Patterns";
import ECartItemActions from "../../types/dto/domain/shop-items/ECartItemActions";
import {useNavigate} from "react-router-dom";
import {Navigations} from "../../types/navigations/Navigations";
import React from "react";

interface SharedItemCardProps {
    item: IShopItemListElement;
    isCartView: boolean;
    handleItemUpdate?: (item: IShopItemListElement, action?: ECartItemActions) => void;
    isAuthorized?: boolean;
}

const SharedItemCard = ({
                            item,
                            isCartView,
                            handleItemUpdate,
                            isAuthorized
                        }: SharedItemCardProps) => {
    const isInCart = item.quantityTaken && item.quantityTaken > 0;
    const isMaxQuantity = item.quantityTaken === item.stockAmount;
    const navigate = useNavigate()
    const itemDetailsLink = `${Navigations.ITEM_DETAILS}/${item.id}`

    const handlePlusClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (handleItemUpdate) handleItemUpdate(item, ECartItemActions.INCREMENT);
    };

    const handleMinusClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isCartView && handleItemUpdate) {
            handleItemUpdate(item);
        } else if (handleItemUpdate) {
            handleItemUpdate(item, ECartItemActions.DECREMENT);
        }
    };

    return (
        <div onClick={() => navigate(itemDetailsLink)} className="item-card">
            <div className="item-content">
                <img
                    className="item-image"
                    src={`${Patterns.DECODE_IMG}${item.itemPicture}`}
                    alt={item.name}
                />
                <div className="item-info">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price">${item.price}</p>
                    <p className="item-rating">Rating: {item.rating}</p>
                    <p className="item-stock">In Stock: {item.stockAmount}</p>
                </div>
            </div>

            {isCartView ? (
                <div className="item-counter">
                    <button className="counter-btn" onClick={handleMinusClick}>
                        <FaMinus/>
                    </button>
                    <span className="quantity">{item.quantityTaken}</span>
                    <button
                        className="counter-btn"
                        onClick={handlePlusClick}
                        disabled={isMaxQuantity}
                    >
                        <FaPlus/>
                    </button>
                </div>
            ) : (isAuthorized && !isInCart ? (
                    <button className="item-action-btn item-action-btn-add" onClick={handlePlusClick}>
                        <FaPlus/>
                    </button>
                ) : (isAuthorized &&
                    <button className="item-action-btn item-action-btn-remove" onClick={handleMinusClick}>
                        <FaMinus/>
                    </button>
                )
            )}
        </div>
    );
};

export default SharedItemCard;