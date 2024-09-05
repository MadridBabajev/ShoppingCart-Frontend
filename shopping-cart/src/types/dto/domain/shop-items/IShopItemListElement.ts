export interface IShopItemListElement {
    id: string;
    name: string;
    price: number;
    rating: number;
    itemPicture?: Uint8Array | null;
    quantityTaken?: number | null;
    stockAmount?: number | null;
}

export default IShopItemListElement;