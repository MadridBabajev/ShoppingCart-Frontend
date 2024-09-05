import CatalogView from "./route-views/CatalogView";
import React, {useEffect, useMemo, useState} from "react";
import Loader from "../../components/layout/Loader";
import Patterns from "../../types/strings/patterns/Patterns";
import IShopItemListElement from "../../types/dto/domain/shop-items/IShopItemListElement";
import {ShopItemService} from "../../services/app-services/entity/ShopItemService";
import HostURLs from "../../types/strings/urls/HostURLs";
import ECartItemActions from "../../types/dto/domain/shop-items/ECartItemActions";
import {notificationManager} from "../../helpers/NotificationManager";
import {NotificationMessages} from "../../types/strings/notifications/NotificationMessages";
import JwtContext from "../../types/context/jwt-context/JwtContext";
import "../../styles/pages/item-list.scss"

const Catalog = () => {
    const [items, setItems] = useState<IShopItemListElement[]>([]);
    const [loading, setLoading] = useState(true);
    const service = useMemo(() => new ShopItemService(), []);
    const { jwtResponse } = React.useContext(JwtContext);
    const isAuthorized = !!jwtResponse;  // Check if the user is logged in

    useEffect(() => {
        service.getAll(HostURLs.GET_ALL_ITEMS).then((response) => {
            if (response) {
                setItems(response);
            }
            else setItems([]);
            console.log(items);
            setLoading(false);
        });
    }, []);

    const handleItemAddRemove = async (item: IShopItemListElement) => {
        const itemIsInCart = (item?.quantityTaken ?? 0) > 0;

        const action = itemIsInCart
            ? ECartItemActions.SET_AMOUNT
            : ECartItemActions.INCREMENT;

        await service.addRemoveCartItem({
            itemId: item.id!,
            itemAction: action,
            quantity: action === ECartItemActions.INCREMENT ? null : 0,
        });

        itemIsInCart
            ? notificationManager.showErrorNotification(NotificationMessages.REMOVED_FROM_CART)
            : notificationManager.showSuccessNotification(NotificationMessages.ADDED_TO_CART);
    };

    const decodeImageSrc = (item: IShopItemListElement): string => {
        if (item?.itemPicture) {
            return `${Patterns.DECODE_IMG}${item.itemPicture}`;
        }
        return "";
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <CatalogView
            items={items}
            decodeImageSrc={decodeImageSrc}
            handleItemAddRemove={handleItemAddRemove}
            isAuthorized={isAuthorized}
        />
    );
};

export default Catalog;