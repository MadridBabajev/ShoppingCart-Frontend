import React, {useEffect, useState, useContext, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import Loader from '../../components/layout/Loader';
import {ShopItemService} from '../../services/app-services/entity/ShopItemService';
import IShopItemDetails from '../../types/dto/domain/shop-items/IShopItemDetails';
import JwtContext from '../../types/context/jwt-context/JwtContext';
import ECartItemActions from '../../types/dto/domain/shop-items/ECartItemActions';
import {notificationManager} from '../../helpers/NotificationManager';
import {NotificationMessages} from '../../types/strings/notifications/NotificationMessages';
import '../../styles/pages/item-details.scss';
import ItemDetailsView from "./route-views/ItemDetailsView";

const ItemDetails = () => {
    const { itemId } = useParams<{ itemId: string }>();
    const [item, setItem] = useState<IShopItemDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const {jwtResponse} = useContext(JwtContext);
    const isAuthorized = !!jwtResponse;
    const service = useMemo(() => new ShopItemService(), []);

    useEffect(() => {
        if (itemId) {
            service.getShopItemDetails(itemId)
                .then(response => {
                    setItem(response || null);
                    if (response) setQuantity(response.quantityTaken ?? 0)
                    else setQuantity(0)
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [itemId, service]);

    const handleSetAmount = async () => {
        if (item && isAuthorized) {
            await service.addRemoveCartItem({
                itemId: item.id,
                itemAction: ECartItemActions.SET_AMOUNT,
                quantity,
            });
            notificationManager.showSuccessNotification(NotificationMessages.QUANTITY_SET + quantity);
        }
    };

    const handleQuantityChange = (newQuantity: number) => {
        if (item && newQuantity <= (item.stockAmount || 0)) {
            setQuantity(newQuantity);
        }
    };

    if (loading) {
        return <Loader/>;
    }

    if (!item) {
        return <div>Item not found</div>;
    }

    return <ItemDetailsView item={item}
                            quantity={quantity}
                            isAuthorized={isAuthorized}
                            handleSetAmount={handleSetAmount}
                            handleQuantityChange={handleQuantityChange}/>;
};

export default ItemDetails;