interface IShopItemDetails {
    id: string;
    name: string;
    price: number;
    rating: number;
    itemPicture?: Uint8Array | null;
    quantityTaken?: number | null;
    stockAmount?: number | null;
    description?: string | null;
}

export default IShopItemDetails;