import IShopItemListElement from "../../dto/domain/shop-items/IShopItemListElement";

interface ICatalogViewProps {
    items: IShopItemListElement[],
    decodeImageSrc: (item: IShopItemListElement) => string,
    handleItemAddRemove: (item: IShopItemListElement) => void,
    isAuthorized: boolean
}

export default ICatalogViewProps;