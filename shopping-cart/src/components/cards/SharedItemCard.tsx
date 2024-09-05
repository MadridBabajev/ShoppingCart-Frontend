import {FaMinus, FaPlus} from "react-icons/fa";
import IShopItemListElement from "../../types/dto/domain/shop-items/IShopItemListElement";
import Patterns from "../../types/strings/patterns/Patterns";
import ECartItemActions from "../../types/dto/domain/shop-items/ECartItemActions";

interface SharedItemCardProps {
    item: IShopItemListElement;
    isCartView: boolean;
    handleItemUpdate?: (item: IShopItemListElement, action: ECartItemActions) => void;
    isAuthorized?: boolean;
}

const SharedItemCard = ({
                            item,
                            isCartView,
                            handleItemUpdate,
                            isAuthorized
                        }: SharedItemCardProps) => {
    const isInCart = (item.quantityTaken ?? 0) >= 0;
    const isMaxQuantity = item.quantityTaken === item.stockAmount;

    const handlePlusClick = () => {
        if (handleItemUpdate) handleItemUpdate(item, ECartItemActions.INCREMENT);
    };

    const handleMinusClick = () => {
        if (isInCart && handleItemUpdate) {
            handleItemUpdate(item, ECartItemActions.SET_AMOUNT);
        } else if (handleItemUpdate) {
            handleItemUpdate(item, ECartItemActions.DECREMENT);
        }
    };

    return (
        <div className="item-card">
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
                        <FaMinus />
                    </button>
                    <span className="quantity">{item.quantityTaken}</span>
                    <button
                        className="counter-btn"
                        onClick={handlePlusClick}
                        disabled={isMaxQuantity}
                    >
                        <FaPlus />
                    </button>
                </div>
            ) : (
                isAuthorized && (
                    <button className="item-action-btn" onClick={handlePlusClick}>
                        <FaPlus />
                    </button>
                )
            )}
        </div>
    );
};

export default SharedItemCard;