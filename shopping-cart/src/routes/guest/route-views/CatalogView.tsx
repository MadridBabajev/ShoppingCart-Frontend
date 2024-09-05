import React from "react";
import SharedItemCard from "../../../components/cards/SharedItemCard";
import IShopItemListElement from "../../../types/dto/domain/shop-items/IShopItemListElement";

interface ICatalogViewProps {
    items: IShopItemListElement[],
    decodeImageSrc: (item: IShopItemListElement) => string,
    handleItemAddRemove: (item: IShopItemListElement) => void,
    isAuthorized: boolean,
}
const CatalogView = (props: ICatalogViewProps) => {
    return (
        <div className="catalog-container">
            <h2 className="mb-4">Catalog</h2>
            {props.items.map((item) => (
                <SharedItemCard
                    key={item.id}
                    item={item}
                    isCartView={false}
                    isAuthorized={props.isAuthorized}
                    handleItemUpdate={props.handleItemAddRemove}
                />
            ))}
        </div>
    );
};

export default CatalogView;