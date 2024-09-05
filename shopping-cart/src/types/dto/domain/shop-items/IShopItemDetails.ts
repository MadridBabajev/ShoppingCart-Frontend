interface IShopItemDetails {
    id: string;
    description?: string | null;
    itemPicture?: Uint8Array | null;
    name: string;
    price: number;
    quantityTaken?: number | null;
    rating: number;
    stockAmount?: number | null;
}

export default IShopItemDetails;