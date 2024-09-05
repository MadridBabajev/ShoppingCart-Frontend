import ShoppingCartView from "./route-views/ShoppingCartView";
import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../components/layout/Loader";
import IShopItemListElement from "../../types/dto/domain/shop-items/IShopItemListElement";
import { ShopItemService } from "../../services/app-services/entity/ShopItemService";
import { notificationManager } from "../../helpers/NotificationManager";
import ECartItemActions from "../../types/dto/domain/shop-items/ECartItemActions";
import { NotificationMessages } from "../../types/strings/notifications/NotificationMessages";
import "../../styles/pages/item-list.scss"

const ShoppingCart = () => {
    const [items, setItems] = useState<IShopItemListElement[]>([]); // Ensure items is initialized as an array
    const [loading, setLoading] = useState(true);
    const service = useMemo(() => new ShopItemService(), []);

    useEffect(() => {
        service.getCartItems().then((response) => {
            if (Array.isArray(response)) {
                setItems(response);
            } else {
                setItems([]); // Fallback to empty array if the response is not an array
            }
            setLoading(false);
        }).catch(error => {
            console.error("Error fetching cart items:", error);
            setLoading(false); // Stop loading even if an error occurs
        });
    }, [service]);

    const handleItemUpdate = async (item: IShopItemListElement, action: ECartItemActions) => {
        await service.addRemoveCartItem({
            itemId: item.id!,
            itemAction: action,
            quantity: null,
        });

        const message = action === ECartItemActions.INCREMENT
            ? NotificationMessages.ADDED_TO_CART
            : NotificationMessages.REMOVED_FROM_CART;

        notificationManager.showSuccessNotification(message);

        // Re-fetch the cart items after update
        const updatedItems = await service.getCartItems();
        setItems(updatedItems || []); // Ensure updatedItems is an array
    };

    const handleClearCart = async () => {
        await service.clearShoppingCart();
        setItems([]);
        notificationManager.showSuccessNotification(NotificationMessages.CART_CLEARED);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <ShoppingCartView
            items={items}
            handleItemUpdate={handleItemUpdate}
            handleClearCart={handleClearCart}
        />
    );
};

export default ShoppingCart;
