import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import IShopItemListElement from "../../../types/dto/domain/shop-items/IShopItemListElement";
import SharedItemCard from "../../../components/cards/SharedItemCard";
import ECartItemActions from "../../../types/dto/domain/shop-items/ECartItemActions";

interface ShoppingCartViewProps {
    items: IShopItemListElement[];
    handleItemUpdate: (item: IShopItemListElement, action: ECartItemActions) => Promise<void>;
    handleClearCart: () => Promise<void>;
}

const ShoppingCartView = ({
                              items,
                              handleItemUpdate,
                              handleClearCart,
                          }: ShoppingCartViewProps) => {
    const [showClearCartModal, setShowClearCartModal] = useState(false);

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h2>Your Shopping Cart</h2>
                <FaTrash className="clear-cart-icon" onClick={() => setShowClearCartModal(true)} />
            </div>

            <div className="cart-items">
                {items.map((item) => (
                    <SharedItemCard
                        key={item.id}
                        item={item}
                        isCartView={true}
                        handleItemUpdate={handleItemUpdate}
                    />
                ))}
            </div>

            {showClearCartModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Are you sure you want to clear the cart?</h3>
                        <button
                            onClick={async () => {
                                await handleClearCart();
                                setShowClearCartModal(false);
                            }}
                        >
                            Yes, clear cart
                        </button>
                        <button onClick={() => setShowClearCartModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingCartView;