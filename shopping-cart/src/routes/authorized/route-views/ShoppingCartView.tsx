import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import IShopItemListElement from "../../../types/dto/domain/shop-items/IShopItemListElement";
import SharedItemCard from "../../../components/cards/SharedItemCard";
import ECartItemActions from "../../../types/dto/domain/shop-items/ECartItemActions";

interface ShoppingCartViewProps {
    items: IShopItemListElement[];
    handleItemUpdate: (item: IShopItemListElement, action?: ECartItemActions) => Promise<void>;
    handleClearCart: () => Promise<void>;
}

const ShoppingCartView = ({
                              items,
                              handleItemUpdate,
                              handleClearCart,
                          }: ShoppingCartViewProps) => {
    const [showClearCartModal, setShowClearCartModal] = useState(false);
    const [showRemoveItemModal, setShowRemoveItemModal] = useState<IShopItemListElement | null>(null);

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h2>Your Shopping Cart</h2>
                {items.length > 0 && (
                    <FaTrash className="clear-cart-icon" onClick={() => setShowClearCartModal(true)} />
                )}
            </div>

            <div className="cart-items">
                {items.length === 0 ? (
                    <div className="empty-cart">
                        <p>Nothing added to the cart yet.</p>
                    </div>
                ) : (
                    items.map((item) => (
                        <SharedItemCard
                            key={item.id}
                            item={item}
                            isCartView={true}
                            handleItemUpdate={(i, action) => {
                                if (i.quantityTaken === 1 && action === ECartItemActions.DECREMENT) {
                                    setShowRemoveItemModal(i); // Show modal when removing the last item
                                } else {
                                    handleItemUpdate(i, action).catch();
                                }
                            }}
                        />
                    ))
                )}
            </div>

            {/* Modal for clearing cart */}
            <Modal show={showClearCartModal} onHide={() => setShowClearCartModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Clear Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to clear the cart?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowClearCartModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={async () => {
                        await handleClearCart();
                        setShowClearCartModal(false);
                    }}>
                        Yes, clear cart
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for removing the last item */}
            <Modal show={showRemoveItemModal !== null} onHide={() => setShowRemoveItemModal(null)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Remove Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to remove <strong>{showRemoveItemModal?.name}</strong> from your cart?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRemoveItemModal(null)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={async () => {
                        if (showRemoveItemModal) {
                            await handleItemUpdate(showRemoveItemModal, ECartItemActions.DECREMENT);
                            setShowRemoveItemModal(null);
                        }
                    }}>
                        Yes, remove item
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ShoppingCartView;
